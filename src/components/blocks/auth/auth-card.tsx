import { Button } from '../../ui/button/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../../ui/card/card'
import { Field, FieldGroup } from '../../ui/field/field'
import { Label } from '../../ui/field/label'
import { Input } from '../../ui/input/input'

function AuthCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <p>DSE<span>iD</span></p>
        <CardTitle>Welcome</CardTitle>
        <CardDescription>Log in to Deep Sea Electronics to continue to All Applications.</CardDescription>
      </CardHeader>

      <FieldGroup>
        <Field>
          <Label htmlFor="username">Username</Label>
          <Input id="username" placeholder="e.g. 123456789" />
        </Field>
        <span>Can't log in to your account?</span>
        <Button variant="default" className="w-full">Continue</Button>
        <span>Don't have an account? <a href="#">Sign up</a></span>
        <Button variant="outline" className="w-full">Continue with a passkey</Button>
      </FieldGroup>
    </Card>
  )
}

export default AuthCard