import { SignIn } from "@/components/auth/sign-in"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function SignInPage() {
  const session = await auth()
  if (session) {
    redirect("/")
  }

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Floating elements for visual interest */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <Card className="glass border-0 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 animate-fade-in">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
                  Content de vous revoir
                </CardTitle>
                <CardDescription className="text-lg mt-2">Connectez-vous à votre compte pour continuer</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <SignIn />

              <p className="text-center text-gray-600 dark:text-gray-300">
                Vous n'avez pas de compte ?{" "}
                <Link href="/inscription" className="text-primary hover:text-primary-light font-semibold">
                  S'inscrire
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}