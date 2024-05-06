import { create } from "zustand";
export const useUserStore = create((set) => ({
  username: "",
  role: "",
  updateRole: (newRole) => set({ role: newRole }),
  clearUserStore: () => set({ nickname: "", role: "" }),
  updateUsername: (newName) => set({ username: newName }),
}));
