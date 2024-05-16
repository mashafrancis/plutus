import { create } from 'zustand'

interface useExpenseModalStore {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useExpenseModal = create<useExpenseModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}))
