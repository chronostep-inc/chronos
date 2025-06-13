import { z } from 'zod'

// Schema
const userSchema = z.object({
    id: z.number().int(),
    email: z.string().min(1, 'Email is required').email({ message: 'Invalid email address' }),
    password: z.string().min(1, 'Password is required'),
    is_admin: z.boolean()
})
const withOutPasswordSchema = userSchema.omit({ password: true })
export const loginSchema = userSchema.pick({ email: true, password: true })

// Types
export type User = z.infer<typeof userSchema>
export type Login = z.infer<typeof loginSchema>
export type UserWithToken = {
    user: z.infer<typeof withOutPasswordSchema>
    accessToken: string
}
