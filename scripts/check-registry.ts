/**
 * Checks registry.json against the code, so nothing ships incomplete.
 *
 *   node scripts/check-registry.ts               errors fail (exit 1)
 *   node scripts/check-registry.ts --warn-docs   docs, JSDoc and e2e gaps are warnings only
 *
 * For every item:
 *   - dependencies / registryDependencies match the imports
 *   - no relative imports, no @/registry/lib or @/registry/hooks imports
 *   - listed files exist
 * For every registry:ui and registry:block item, also:
 *   - <name>.stories.tsx next to the component
 *   - <name>.mdx next to the component, attached with <Meta of={…} name="Docs" />
 *   - no "autodocs" tag in the stories file once the .mdx exists
 *   - a JSDoc comment on the main export
 *   - tests/e2e/<name>.spec.ts when the item has "meta": { "interactive": true }
 * And across the repo:
 *   - every component in registry/ui and registry/blocks is listed in registry.json
 *   - every .mdx in registry/ belongs to a component
 *
 * Needs Node 22.18 or later (runs TypeScript directly).
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, dirname, join } from "node:path";

interface RegistryFile {
  path: string;
  type?: string;
}
interface RegistryItem {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files?: RegistryFile[];
  meta?: { interactive?: boolean; [key: string]: unknown };
}

const WARN_DOCS = process.argv.includes("--warn-docs");
const COMPONENT_TYPES = new Set(["registry:ui", "registry:block"]);
const IGNORED_PACKAGES = new Set(["react", "react-dom"]);
const SCANNED_FOLDERS = ["registry/ui", "registry/blocks"];

const registry = JSON.parse(readFileSync("registry.json", "utf8")) as {
  homepage?: string;
  items: RegistryItem[];
};

// "https://github.com/owner/repo" → "owner/repo"
const repo = registry.homepage?.match(/github\.com\/([^/]+\/[^/]+)/)?.[1];
if (!repo) {
  console.error(
    'Set "homepage" in registry.json to the GitHub repo URL, e.g. https://github.com/owner/repo',
  );
  process.exit(1);
}

/* ------------------------------------------------------------------ */
/* Reporting                                                           */
/* ------------------------------------------------------------------ */

const report = new Map<
  string,
  { errors: string[]; warnings: string[]; suggestion?: string }
>();
function entry(key: string) {
  if (!report.has(key)) report.set(key, { errors: [], warnings: [] });
  return report.get(key)!;
}
const error = (key: string, msg: string) => entry(key).errors.push(msg);
const warn = (key: string, msg: string) => entry(key).warnings.push(msg);
/** Docs, JSDoc and e2e problems: errors, or warnings with --warn-docs */
const docIssue = (key: string, msg: string) =>
  (WARN_DOCS ? warn : error)(key, msg);

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

/** "@base-ui/react/field" → "@base-ui/react", "lucide-react/icons" → "lucide-react" */
function packageName(spec: string): string {
  const parts = spec.split("/");
  return spec.startsWith("@") ? parts.slice(0, 2).join("/") : parts[0];
}

function importsOf(source: string): string[] {
  const specs = new Set<string>();
  const patterns = [
    /\bimport\s+(?:type\s+)?[^"']*?from\s+["']([^"']+)["']/g, // import x from "y"
    /\bimport\s+["']([^"']+)["']/g, // import "y"
    /\bexport\s+[^"']*?from\s+["']([^"']+)["']/g, // export … from "y"
    /\bimport\(\s*["']([^"']+)["']\s*\)/g, // import("y")
  ];
  for (const re of patterns)
    for (const m of source.matchAll(re)) specs.add(m[1]);
  return [...specs];
}

/** First exported name: `export { Button, buttonVariants }` or `export function Button` */
function mainExport(source: string): string | undefined {
  return (
    source.match(/export\s*\{\s*([A-Za-z0-9_]+)/)?.[1] ??
    source.match(
      /export\s+(?:default\s+)?(?:function|const)\s+([A-Za-z0-9_]+)/,
    )?.[1]
  );
}

/** True if a /** … *\/ comment sits directly above `function Name` or `const Name`. */
function hasJsDoc(source: string, name: string): boolean {
  const decl = new RegExp(
    String.raw`\/\*\*[\s\S]*?\*\/\s*(?:export\s+)?(?:default\s+)?(?:function|const)\s+${name}\b`,
  );
  return decl.test(source);
}

function walk(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : [p];
  });
}

const normalise = (p: string) => p.replace(/\\/g, "/").replace(/^\.\//, "");
const withoutVersion = (d: string) => d.replace(/(.)@.*$/, "$1");

/* ------------------------------------------------------------------ */
/* Per-item checks                                                     */
/* ------------------------------------------------------------------ */

const itemNames = new Set(registry.items.map((i) => i.name));
const listedFiles = new Set<string>();

for (const item of registry.items) {
  if (!item.files?.length) continue; // e.g. theme items
  const key = item.name;

  /* Dependencies ---------------------------------------------------- */
  const deps = new Set<string>();
  const regDeps = new Set<string>();

  for (const file of item.files) {
    listedFiles.add(normalise(file.path));
    if (!existsSync(file.path)) {
      error(key, `file not found: ${file.path}`);
      continue;
    }
    const source = readFileSync(file.path, "utf8");

    for (const spec of importsOf(source)) {
      if (spec.startsWith(".")) {
        error(
          key,
          `relative import "${spec}" in ${file.path} breaks after install; use an @/ alias`,
        );
      } else if (spec === "@/lib/utils") {
        regDeps.add("utils");
      } else if (/^@\/registry\/(lib|hooks)\//.test(spec)) {
        error(
          key,
          `"${spec}" is rewritten wrongly on install; use "${spec.replace("@/registry/", "@/")}"`,
        );
      } else if (/^@\/(registry\/ui|hooks|lib)\//.test(spec)) {
        const name = spec.split("/").pop()!;
        if (!itemNames.has(name))
          error(
            key,
            `imports "${spec}" but there is no "${name}" item in registry.json`,
          );
        regDeps.add(`${repo}/${name}`);
      } else if (spec.startsWith("@/")) {
        error(key, `unrecognised alias "${spec}"`);
      } else {
        const pkg = packageName(spec);
        if (!IGNORED_PACKAGES.has(pkg)) deps.add(pkg);
      }
    }
  }

  const declaredDeps = new Set(item.dependencies ?? []);
  const declaredRegDeps = new Set(item.registryDependencies ?? []);
  const declaredDepNames = new Set([...declaredDeps].map(withoutVersion));

  const depProblems = [
    ...[...deps]
      .filter((d) => !declaredDepNames.has(d))
      .map((d) => `add to dependencies: "${d}"`),
    ...[...declaredDeps]
      .filter((d) => !deps.has(withoutVersion(d)))
      .map((d) => `not imported, remove from dependencies: "${d}"`),
    ...[...regDeps]
      .filter((d) => !declaredRegDeps.has(d))
      .map((d) => `add to registryDependencies: "${d}"`),
    ...[...declaredRegDeps]
      .filter((d) => !regDeps.has(d))
      .map((d) => `not imported, remove from registryDependencies: "${d}"`),
  ];
  for (const p of depProblems) error(key, p);
  if (depProblems.length) {
    entry(key).suggestion =
      `"dependencies": ${JSON.stringify([...deps].sort())},\n` +
      `    "registryDependencies": ${JSON.stringify([...regDeps].sort())}`;
  }

  /* Stories, docs, JSDoc and e2e (components only) ------------------ */
  if (!COMPONENT_TYPES.has(item.type)) continue;

  const mainFile = item.files[0].path;
  if (!existsSync(mainFile)) continue;
  const dir = dirname(mainFile);
  const base = basename(mainFile).replace(/\.tsx?$/, "");
  const storiesPath = join(dir, `${base}.stories.tsx`);
  const mdxPath = join(dir, `${base}.mdx`);

  // Stories
  if (!existsSync(storiesPath)) {
    error(key, `missing stories: ${normalise(storiesPath)}`);
  }

  // Docs page
  if (!existsSync(mdxPath)) {
    docIssue(key, `missing docs: ${normalise(mdxPath)}`);
  } else {
    const mdx = readFileSync(mdxPath, "utf8");
    if (!new RegExp(String.raw`from\s+["']\./${base}\.stories["']`).test(mdx)) {
      docIssue(key, `${normalise(mdxPath)} should import "./${base}.stories"`);
    }
    if (!/<Meta\s+of=\{[^}]+\}[^>]*name=["']Docs["']/.test(mdx)) {
      docIssue(key, `${normalise(mdxPath)} needs <Meta of={…} name="Docs" />`);
    }
    if (
      existsSync(storiesPath) &&
      /tags:\s*\[[^\]]*["']autodocs["']/.test(readFileSync(storiesPath, "utf8"))
    ) {
      docIssue(
        key,
        `remove the "autodocs" tag from ${normalise(storiesPath)}; it hides ${base}.mdx`,
      );
    }
  }

  // JSDoc on the main export
  const source = readFileSync(mainFile, "utf8");
  const exported = mainExport(source);
  if (!exported) {
    error(key, `no named export found in ${mainFile}`);
  } else if (!hasJsDoc(source, exported)) {
    docIssue(
      key,
      `add a /** JSDoc */ comment above ${exported} in ${mainFile}`,
    );
  }

  // E2E test for interactive components
  if (item.meta?.interactive) {
    const spec = `tests/e2e/${item.name}.spec.ts`;
    if (!existsSync(spec))
      docIssue(key, `interactive component without an e2e test: ${spec}`);
  }
}

/* ------------------------------------------------------------------ */
/* Repo-wide checks                                                    */
/* ------------------------------------------------------------------ */

const allFiles = SCANNED_FOLDERS.flatMap(walk).map(normalise);

// Components in the folders but not in registry.json
for (const file of allFiles) {
  if (!/\.tsx?$/.test(file) || /\.(stories|test|spec)\.tsx?$/.test(file))
    continue;
  if (!listedFiles.has(file))
    error("(repo)", `${file} is not listed in registry.json`);
}

// .mdx files with no component next to them
for (const file of allFiles.filter((f) => f.endsWith(".mdx"))) {
  const component = file.replace(/\.mdx$/, ".tsx");
  if (!listedFiles.has(component))
    warn("(repo)", `${file} has no matching component (${component})`);
}

/* ------------------------------------------------------------------ */
/* Output                                                              */
/* ------------------------------------------------------------------ */

let errorCount = 0;
let warningCount = 0;

for (const [key, { errors, warnings, suggestion }] of report) {
  if (!errors.length && !warnings.length) continue;
  console.log(`\n${key}`);
  for (const e of errors) console.log(`  ✗ ${e}`);
  for (const w of warnings) console.log(`  ! ${w}`);
  if (suggestion) console.log(`  suggested:\n    ${suggestion}`);
  errorCount += errors.length;
  warningCount += warnings.length;
}

const checked = registry.items.filter((i) => i.files?.length).length;
console.log(
  `\nChecked ${checked} items: ${errorCount} error(s), ${warningCount} warning(s).`,
);
process.exit(errorCount ? 1 : 0);
