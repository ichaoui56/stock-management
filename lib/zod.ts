import { object, string } from "zod"

export const signInSchema = object({
  email: string({ required_error: "L'email est requis" })
    .email("Veuillez entrer une adresse email valide"),
  password: string({ required_error: "Le mot de passe est requis" })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(32, "Le mot de passe ne doit pas dépasser 32 caractères"),
})

export const signUpSchema = object({
  email: string({ required_error: "L'email est requis" })
    .email("Veuillez entrer une adresse email valide"),
  password: string({ required_error: "Le mot de passe est requis" })
    .min(8, "Le mot de passe doit contenir au moins 8 caractères")
    .max(32, "Le mot de passe ne doit pas dépasser 32 caractères"),
  name: string({ required_error: "Le nom est requis" })
    .min(1, "Le nom est requis")
    .max(50, "Le nom ne doit pas dépasser 50 caractères"),
  confirmPassword: string({ required_error: "La confirmation du mot de passe est requise" })
    .min(8, "La confirmation du mot de passe doit contenir au moins 8 caractères")
    .max(32, "La confirmation du mot de passe ne doit pas dépasser 32 caractères"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Les mots de passe ne correspondent pas",
  path: ["confirmPassword"], // Error will be attached to confirmPassword field
})

export const signInDefaultValues = {
  email: "",
  password: "",
}

export const signUpDefaultValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
}