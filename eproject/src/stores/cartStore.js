import { create } from 'zustand'
import { db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export const useCartStore = create((set) => ({
  items: [],
  loadCart: async (userId) => {
    const docRef = doc(db, 'carts', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      set({ items: docSnap.data().items })
    }
  },
  addItem: (item) => set((state) => {
    const newItems = [...state.items, item]
    state.saveCart(newItems)
    return { items: newItems }
  }),
  removeItem: (id) => set((state) => {
    const newItems = state.items.filter((item) => item.id !== id)
    state.saveCart(newItems)
    return { items: newItems }
  }),
  updateQuantity: (id, quantity) => set((state) => {
    const newItems = state.items.map((item) => item.id === id ? { ...item, quantity } : item)
    state.saveCart(newItems)
    return { items: newItems }
  }),
  clearCart: () => set({ items: [] }),
  saveCart: async (items, userId) => {
    if (userId) {
      await setDoc(doc(db, 'carts', userId), { items })
    }
  },
}))