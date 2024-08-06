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
  date: z.string().transform((str) => new Date(str)),
  name: z.string().min(1, 'Name is required'),
  price: z.string().min(1, 'Expense price is required'),
  notes: z.string().optional(),
  autocomplete: z.array(z.string()).optional(),
})

export type CreateExpenseFormValues = z.infer<typeof createExpenseSchema>

export const updateExpenseSchema = z.object({
  id: z.string().uuid(),
  name: z.string().optional(),
  notes: z.string().optional().nullable(),
  price: z.string().optional(),
  category: z.string().optional(),
  paid_via: z.string().optional(),
  date: z.string().optional(),
  autocomplete: z.array(z.string()).optional(),
})

export type UpdateExpenseFormValues = z.infer<typeof updateExpenseSchema>

export const deleteExpensesSchema = z.object({
  ids: z.array(z.string()),
})
