import { create } from "zustand";

interface AuthState {
  filter: string;
  filterCategories: string;
}

interface Action {
  setFilter: (filter: string) => void;
  setFilterCategories: (filterCategories: string) => void;
}

export const useFilterDashboard = create<AuthState & Action>()((set) => ({
  filter: "",
  setFilter: (filter) => {
    set({ filter });
  },
  filterCategories: "",
  setFilterCategories: (filterCategories) => {
    set({ filterCategories });
  },
}));
