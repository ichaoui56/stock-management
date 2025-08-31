import { SignUp } from "@/components/auth/sign-up"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { UserPlus } from "lucide-react"
import Link from "next/link"
import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
  const session = await auth()
  if (session) {
    redirect("/")
  }

  return (
    <div>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="w-full max-w-md">
          {/* Floating elements for visual interest */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <Card className="glass border-0 shadow-2xl backdrop-blur-xl bg-white/80 dark:bg-gray-900/80 animate-fade-in">
            <CardHeader className="text-center space-y-4 pb-8">
              <div className="mx-auto w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <div>
                <CardTitle className="text-3xl font-bold bg-primary bg-clip-text text-transparent">
                  Créer un compte
                </CardTitle>
                <CardDescription className="text-lg mt-2">Rejoignez-nous dès aujourd'hui</CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <SignUp />

              <p className="text-center text-gray-600 dark:text-gray-300">
                Vous avez déjà un compte ?{" "}
                <Link href="/connexion" className="text-primary hover:text-primary-light font-semibold">
                  Se connecter
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}