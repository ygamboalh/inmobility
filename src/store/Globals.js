import { create } from "zustand";
import { persist } from 'zustand/middleware'

export const useIsSearched = create(
  persist(
    (set) => ({
      isSearched: false,
      setIsSearched: () => set((state) => ({ isSearched: !state.isSearched })),
    }),
    {
      name: 'isSearched'
    }
  )
)
