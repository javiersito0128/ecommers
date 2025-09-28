import { create } from 'zustand'
import { auth } from '../firebase'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  subscribe: () => onAuthStateChanged(auth, (user) => set({ user, loading: false })),
  logout: () => signOut(auth),
}))