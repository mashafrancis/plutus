import { z } from 'zod'

export const verifyOtpSchema = z.object({
  type: z.enum(['phone', 'email']),
  token: z.string(),
  phone: z.string().optional(),
  email: z.string().optional(),
})

export const updateUserSchema = z.object({
  basic_usage_limit_email: z.boolean().optional(),
  billing_start_date: z.string().optional(),
  created_at: z.string().optional(),
  currency: z.string().optional(),
  email: z.string().optional(),
  id: z.string().optional(),
  locale: z.string().optional(),
  monthly_email_report: z.boolean().optional(),
  new_signup_email: z.boolean().optional(),
  order_identifier: z.string().optional(),
  order_number: z.string().optional(),
  order_status: z.string().optional(),
  order_store_id: z.string().optional(),
  plan_status: z.string().optional(),
  premium_plan_expired_email: z.boolean().optional(),
  premium_usage_limit_email: z.boolean().optional(),
  trial_start_date: z.string().optional(),
  updated_at: z.string().optional(),
  usage: z.number().optional(),
})

export type UpdateUserFormValues = z.infer<typeof updateUserSchema>

export const createExpenseSchema = z.object({
  category: z.string().min(1),
  paid_via: z.string().min(1),
  date: z.string().min(1),
  name: z.string().min(1),
  price: z.string().min(1),
  notes: z.string().min(1),
  autocomplete: z.array(z.string()).optional(),
})

export type CreateExpenseFormValues = z.infer<typeof createExpenseSchema>
