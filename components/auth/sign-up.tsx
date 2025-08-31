"use client"

import { useState } from "react"
import { useActionState } from "react"
import { signUpAction } from "@/lib/actions/auth-actions"
import { FormFieldApp } from "@/components/ui/form-field-app"
import SubmitButton from "@/components/ui/submit-button"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { signUpDefaultValues } from "@/lib/zod"
import { FormError } from "@/components/ui/form-error"

export function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [state, formAction] = useActionState(signUpAction, null)

  const formValues = {
    email: state?.values?.email || signUpDefaultValues.email,
    password: state?.values?.password || signUpDefaultValues.password,
    confirmPassword: state?.values?.confirmPassword || signUpDefaultValues.confirmPassword || "",
    name: state?.values?.name || signUpDefaultValues.name
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Name and Email in same row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <FormFieldApp
            defaultValues={formValues}
            name="name"
            label="Nom complet"
            type="text"
            placeholder="Jean Dupont"
            required
          />
          <FormError errors={state?.errors?.name} />
        </div>
        
        <div className="space-y-2">
          <FormFieldApp
            defaultValues={formValues}
            name="email"
            label="Adresse email"
            type="email"
            placeholder="jean@exemple.com"
            required
          />
          <FormError errors={state?.errors?.email} />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <div className="relative">
          <FormFieldApp
            defaultValues={formValues}
            name="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="Créez un mot de passe fort"
            required
          />
          <Button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-[23px] text-black bg-transparent border-none hover:bg-transparent transition-colors"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>
        <FormError errors={state?.errors?.password} />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <div className="relative">
          <FormFieldApp
            defaultValues={formValues}
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmez votre mot de passe"
            required
          />
          <Button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-0 top-[23px] text-black bg-transparent border-none hover:bg-transparent transition-colors"
          >
            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </Button>
        </div>
        <FormError errors={state?.errors?.confirmPassword} />
      </div>

      <SubmitButton
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Créer un compte
      </SubmitButton>
    </form>
  )
}