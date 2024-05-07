import { create } from "zustand";
import {persist} from "zustand/middleware"
export const useUserStore = create(
  persist((set, get) => ({
  id: null,
  username: null,
  role: null,
  balance: 0,
  updateRole: (newRole) => set({role: newRole}),
  clearUserStore: () => set({ username:null, role: null, id: null, balance: 0}),
  updateUsername: (newName) => set({ username: newName }),
  updateId: (newId) => set({ id: newId }),
  updateBalance: (newBalance) => set({balance: newBalance})
}), {name: 'user'}))