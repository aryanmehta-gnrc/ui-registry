import * as React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "cn"


const linkClass =
  "rounded-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"

function AuthCard() {
  const usernameId = React.useId()

  return (
    <Card className={cn("w-full max-w-sm")}>
      <CardHeader className="justify-items-center text-center">
        <div className="mb-2">
            <span className="text-4xl font-medium tracking-tight text-muted-foreground">
                DSE
              <span className="text-primary">iD</span>
          </span>
        </div>
        <CardTitle className="text-2xl font-normal">Welcome</CardTitle>
        <CardDescription>Log in to Deep Sea Electronics to continue to All Applications.</CardDescription>
      </CardHeader>

      <CardContent>
        <FieldGroup>
          {/* Label sits on the input's top border, as in the design */}
          <Field>
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
                name="username"
                autoComplete="username"
                required
                className="h-12 focus-visible:border-ring"
              />
            </div>
          </Field>

          <a href={""} className={cn(linkClass, "w-fit text-sm")}>
            Can&apos;t log in to your account?
          </a>

          <Button type="button" size="lg" className="w-full">
            Continue
          </Button>

          <p className="text-sm">
            Don&apos;t have an account?{" "}
            <a href={""} className={linkClass}>
              Sign up
            </a>
          </p>

          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">OR</FieldSeparator>

          <Button type="button" variant="outline" size="lg" className="w-full">
            Continue with a passkey
          </Button>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}

export { AuthCard };