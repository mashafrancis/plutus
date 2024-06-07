import { z } from 'zod'

export const verifyOtpSchema = z.object({
  type: z.enum(['phone', 'email']),
  token: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
})
