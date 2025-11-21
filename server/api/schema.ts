import z from "zod/v4";

export const ZGetExpensesSchema = z.object({
  to: z.string(),
  from: z.string(),
  categories: z.string().optional(),
  cursor: z.string().nullable().optional(),
  sort: z.array(z.string()).nullable().optional(),
  pageSize: z.coerce.number().min(1).max(100).optional(),
  q: z.string().nullable().optional(),
});

export const ZCreateOrPatchExpensesSchema = z.object({
  id: z.string(),
  notes: z.string(),
  name: z.string(),
  price: z.string(),
  category: z.string(),
  date: z.string(),
  paid_via: z.string(),
});

export type TCreatePostSchema = z.infer<typeof ZCreateOrPatchExpensesSchema>;

export const ZGetIncomeSchema = z.object({
  to: z.string(),
  from: z.string(),
  categories: z.string().optional(),
  cursor: z.string().nullable().optional(),
  sort: z.array(z.string()).nullable().optional(),
  pageSize: z.coerce.number().min(1).max(100).optional(),
  q: z.string().nullable().optional(),
});

export const ZCreateOrPatchIncomeSchema = z.object({
  id: z.string(),
  notes: z.string(),
  name: z.string(),
  price: z.string(),
  category: z.string(),
  date: z.string(),
});

export const ZGetSubscriptionsSchema = z.object({
  to: z.string(),
  from: z.string(),
  categories: z.string().optional(),
  cursor: z.string().nullable().optional(),
  sort: z.array(z.string()).nullable().optional(),
  pageSize: z.coerce.number().min(1).max(100).optional(),
  q: z.string().nullable().optional(),
});

export const ZCreateOrPatchSubscriptionsSchema = z.object({
  id: z.string(),
  notes: z.string(),
  name: z.string(),
  price: z.string(),
  category: z.string(),
  cancelledAt: z.string(),
  paid_dates: z.array(z.any()),
  prev_renewal_date: z.string(),
  renewal_date: z.string(),
  paid: z.string(),
  url: z.string(),
  active: z.boolean(),
  notify: z.string(),
  date: z.string(),
});

export const ZGetInvestmentsSchema = z.object({
  to: z.string(),
  from: z.string(),
  categories: z.string().optional(),
  cursor: z.string().nullable().optional(),
  sort: z.array(z.string()).nullable().optional(),
  pageSize: z.coerce.number().min(1).max(100).optional(),
  q: z.string().nullable().optional(),
});

export const ZCreateOrPatchInvestmentsSchema = z.object({
  id: z.string(),
  notes: z.string(),
  name: z.string(),
  price: z.string(),
  category: z.string(),
  date: z.string(),
});
