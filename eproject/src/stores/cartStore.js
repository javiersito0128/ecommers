import { create } from 'zustand'
import { db } from '../firebase'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export const useCartStore = create((set, get) => ({
  items: [],
  loadCart: async (userId) => {
    if (!userId) return;
    const docRef = doc(db, 'carts', userId)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      set({ items: docSnap.data().items || [] })
    }
  },
  addItem: (item) => set((state) => {
    const existingItem = state.items.find(i => i.id === item.id)
    let newItems
    if (existingItem) {
      newItems = state.items.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i)
    } else {
      newItems = [...state.items, { ...item, quantity: 1 }]
    }
    get().saveCart(newItems, get().userId)
    return { items: newItems }
  }),
  removeItem: (id) => set((state) => {
    const newItems = state.items.filter((item) => item.id !== id)
    get().saveCart(newItems, get().userId)
    return { items: newItems }
  }),
  updateQuantity: (id, quantity) => set((state) => {
    const newItems = state.items.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)
    get().saveCart(newItems, get().userId)
    return { items: newItems }
  }),
  clearCart: () => set({ items: [] }),
  saveCart: async (items, userId) => {
    if (userId) {
      await setDoc(doc(db, 'carts', userId), { items })
    }
  },
}))