import { z } from 'zod'

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'L\'email est requis',
      invalid_type_error: 'L\'email doit être une chaîne de caractères',
    })
    .email('L\'adresse email n\'est pas valide')
    .min(1, 'L\'email est requis'),
  password: z
    .string({
      required_error: 'Le mot de passe est requis',
      invalid_type_error: 'Le mot de passe doit être une chaîne de caractères',
    })
    .min(1, 'Le mot de passe est requis'),
})

export const registerSchema = z.object({
  name: z
    .string({
      required_error: 'Le nom est requis',
      invalid_type_error: 'Le nom doit être une chaîne de caractères',
    })
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(50, 'Le nom ne peut pas dépasser 50 caractères'),
  email: loginSchema.shape.email,
  password: z
    .string({
      required_error: 'Le mot de passe est requis',
      invalid_type_error: 'Le mot de passe doit être une chaîne de caractères',
    })
    .regex(
      passwordRegex,
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial',
    ),
})

export const passwordResetSchema = z.object({
  email: loginSchema.shape.email,
})

export const passwordUpdateSchema = z.object({
  currentPassword: loginSchema.shape.password,
  newPassword: registerSchema.shape.password,
  confirmPassword: z.string(),
}).refine(data => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type PasswordResetInput = z.infer<typeof passwordResetSchema>
export type PasswordUpdateInput = z.infer<typeof passwordUpdateSchema>
