"use client"

import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="max-w-md w-full shadow-lg border border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-destructive text-2xl font-bold flex items-center justify-center gap-2">
            <AlertCircle className="h-6 w-6" />
            Ada yang salah
          </CardTitle>
          <CardDescription>Silakan coba lagi.</CardDescription>
        </CardHeader>

        <CardContent>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Pesan error</AlertTitle>
            <AlertDescription className="wrap-break-word">
              {error.message}
            </AlertDescription>
          </Alert>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={reset}>
            Coba lagi
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
