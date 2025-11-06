"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormField } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import authValidation from "@/lib/validations/authValidation"
import { FormDataLogin } from "@/types"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

function LoginPage() {
  const form = useForm({ resolver: zodResolver(authValidation.login) })

  const onSubmit = (data: FormDataLogin) => {
    console.log(data)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/10 via-background to-secondary/10 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>
            Login untuk mengakses Rasa Kediri admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Input type="email" {...field} required />
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Input type="password" {...field} required />
                )}
              />
              <Button type="submit" className="w-full">
                {/* {loading ? 'Loading...' : 'Login'} */}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
