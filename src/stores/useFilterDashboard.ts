import { create } from "zustand";

interface AuthState {
  filterUser: string;
  filterCategories: string;
}

interface Action {
  setFilterUser: (filterUser: string) => void;
  setFilterCategories: (filterCategories: string) => void;
}

export const useFilterDashboard = create<AuthState & Action>()((set) => ({
  filterUser: "",
  setFilterUser: (filterUser) => {
    set({ filterUser });
  },
  filterCategories: "",
  setFilterCategories: (filterCategories) => {
    set({ filterCategories });
  },
}));
