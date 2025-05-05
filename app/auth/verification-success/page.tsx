import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function VerificationSuccessPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-50 to-green-100 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Email Verified!</CardTitle>
          <CardDescription className="text-gray-600">
            Thank you for verifying your email address. Your account is now fully activated.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700">
            You can now access all features of the Climate Pledge app and start making a positive impact on the
            environment.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full bg-green-600 hover:bg-green-700">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/pledges">Explore Pledges</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
