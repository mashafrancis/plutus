import { apiUrls } from '@/lib/apiUrls'
import { ExpenseData } from '@/lib/validations/expenses'

// export type ExpenseData = {
// 	notes: string;
// 	name: string;
// 	price: string;
// 	category: string;
// 	date: string;
// 	paid_via: string;
// 	id: string | null;
// };

export const addExpense = async (data: ExpenseData) => {
  const res = await fetch(apiUrls.expenses.add, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    throw await res.json()
  }
  return await res.json()
}

export const deleteExpense = async (id: string) => {
  const res = await fetch(apiUrls.expenses.modify, {
    method: 'DELETE',
    body: JSON.stringify({ id: [id] }),
  })
  return await res.json()
}

export const editExpense = async (data: ExpenseData) => {
  const res = await fetch(apiUrls.expenses.modify, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
  return await res.json()
}
