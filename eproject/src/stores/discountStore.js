import { create } from 'zustand'

const coupons = { DESC10: 10, DESC20: 20, DESC30: 30, DESC50: 50 }

export const useDiscountStore = create((set) => ({
  discount: 0,
  applyCoupon: (code) => set({ discount: coupons[code.toUpperCase()] || 0 }),
}))