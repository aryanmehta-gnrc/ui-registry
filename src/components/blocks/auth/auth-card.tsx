"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "cn"

/*
 * Identifier-first sign-in card: step 1 asks for the username only.
 * Presentational: it renders a native form and the app handles
 * authentication, so it works as a Symfony island or in a React app.
 */

type AuthCardProps = {
  /** URL to POST the username to (Symfony), or a React form action. */
  action: string | ((formData: FormData) => void | Promise<void>)
  /** Brand mark shown above the title, e.g. the DSEiD wordmark. */
  logo?: React.ReactNode
  title?: string
  description?: React.ReactNode
  /** Name of the username field posted to the server. */
  usernameName?: string
  defaultUsername?: string
  /** Already-translated, generic message, e.g. "We couldn't find that account." */
  error?: string | null
  /** Hidden CSRF field, if the server requires one. */
  csrf?: { name: string; token: string }
  /** Omit any of these to hide that element. */
  forgotHref?: string
  signUpHref?: string
  /** Passkey sign-in: a URL to navigate to, or a handler (React apps only). */
  passkeyHref?: string
  onPasskey?: () => void
  className?: string
}

// text-primary works in any shadcn theme. With a light brand green, add a
// darker --link token and use text-link instead (see the contrast note).
const linkClass =
  "font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring rounded-sm"

function AuthCard({
  action,
  logo,
  title = "Welcome",
  description,
  usernameName = "_username",
  defaultUsername,
  error,
  csrf,
  forgotHref,
  signUpHref,
  passkeyHref,
  onPasskey,
  className,
}: AuthCardProps) {
  const id = React.useId()
  const usernameId = `${id}-username`
  const errorId = `${id}-error`
  const [submitting, setSubmitting] = React.useState(false)
  const hasPasskey = Boolean(passkeyHref || onPasskey)

  return (
    <Card className={cn("w-full max-w-sm", className)}>
      <CardHeader className="justify-items-center text-center">
        {logo && <div className="mb-2">{logo}</div>}
        <CardTitle className="text-2xl font-normal">{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>

      <CardContent>
        <form method="post" action={action} onSubmit={() => setSubmitting(true)}>
          <FieldGroup>
            {/* Label sits on the input's top border, as in the design */}
            <Field data-invalid={error ? true : undefined}>
              <div className="group/username relative">
                <FieldLabel
                  htmlFor={usernameId}
                  className="absolute -top-2 left-3 z-10 gap-0.5 bg-card px-1 text-xs text-muted-foreground group-focus-within/username:text-foreground"
                >
                  Username
                  <span aria-hidden="true">*</span>
                </FieldLabel>
                <Input
                  id={usernameId}
                  name={usernameName}
                  defaultValue={defaultUsername}
                  autoComplete="username webauthn"
                  autoCapitalize="none"
                  spellCheck={false}
                  required
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? errorId : undefined}
                  className="h-12 focus-visible:border-ring"
                />
              </div>
              {error && (
                <FieldError id={errorId}>{error}</FieldError>
              )}
            </Field>

            {csrf && <input type="hidden" name={csrf.name} value={csrf.token} />}

            {forgotHref && (
              <a href={forgotHref} className={cn(linkClass, "w-fit text-sm")}>
                Can&apos;t log in to your account?
              </a>
            )}

            <Button type="submit" size="lg" className="w-full" disabled={submitting}>
              {submitting ? "Checking…" : "Continue"}
            </Button>

            {signUpHref && (
              <p className="text-sm">
                Don&apos;t have an account?{" "}
                <a href={signUpHref} className={linkClass}>
                  Sign up
                </a>
              </p>
            )}

            {hasPasskey && (
              <>
                <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">OR</FieldSeparator>
                {passkeyHref ? (
                  <Button variant="outline" size="lg" className="w-full" render={<a href={passkeyHref} />} nativeButton={false}>
                    Continue with a passkey
                  </Button>
                ) : (
                  <Button type="button" variant="outline" size="lg" className="w-full" onClick={onPasskey}>
                    Continue with a passkey
                  </Button>
                )}
              </>
            )}
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}

export { AuthCard }
export type { AuthCardProps }