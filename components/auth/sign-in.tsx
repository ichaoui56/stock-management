"use client"

import { useState } from "react"
import { useActionState } from "react"
import { signInAction } from "@/lib/actions/auth-actions"
import { FormFieldApp } from "@/components/ui/form-field-app"
import SubmitButton from "@/components/ui/submit-button"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { signInDefaultValues } from "@/lib/zod"
import { FormError } from "@/components/ui/form-error"

export function SignIn() {
  const [showPassword, setShowPassword] = useState(false)
  const [state, formAction] = useActionState(signInAction, null)

  const formValues = {
    email: state?.values?.email || signInDefaultValues.email,
    password: state?.values?.password || signInDefaultValues.password,
  }

  return (
    <form action={formAction} className="space-y-6">
      <div className="space-y-2">
        <FormFieldApp
          defaultValues={formValues}
          name="email"
          label="Adresse email"
          type="email"
          placeholder="Entrez votre email"
          required
          className="relative"
        />
        <FormError errors={state?.errors?.email} />
      </div>

      <div className="space-y-2">
        <div className="relative">
          <FormFieldApp
            defaultValues={formValues}
            name="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            placeholder="Entrez votre mot de passe"
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

      <SubmitButton
        type="submit"
        className="w-full h-12 bg-primary hover:bg-primary-light text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group"
      >
        Se connecter
      </SubmitButton>
    </form>
  )
}