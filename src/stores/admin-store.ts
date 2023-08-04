import { create } from "zustand";

interface AdminState {
  collection: string | null;
  setCollection: (collection: string) => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  collection: null,
  setCollection: (collection) => set({ collection }),
}));
