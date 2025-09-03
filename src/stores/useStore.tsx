import { create } from "zustand";

interface StoreState {
  showBottomNav: boolean;
  setBottomNav: (value: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  showBottomNav: true,

  setBottomNav: (value) => set({ showBottomNav: value }),
}));
