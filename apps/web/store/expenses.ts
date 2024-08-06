import { create } from 'zustand'

interface ExpensesState {
  expensesIds: string[]
  canDelete?: boolean
  columns: string[]
  setColumns: (columns?: string[]) => void
  setCanDelete: (canDelete?: boolean) => void
  setExpensesIds: (expensesIds?: string[]) => void
}

export const useExpensesStore = create<ExpensesState>()((set) => ({
  expensesIds: [],
  columns: [],
  canDelete: false,
  setCanDelete: (canDelete) => set({ canDelete }),
  setColumns: (columns) => set({ columns }),
  setExpensesIds: (expensesIds) => set({ expensesIds }),
}))
