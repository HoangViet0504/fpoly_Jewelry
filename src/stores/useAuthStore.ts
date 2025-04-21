import { create } from "zustand";
import { UserDetail } from "../types/interface";

interface AuthState {
  user?: UserDetail | undefined;
  error?: string | undefined;
  isLoading: boolean;
}

interface Action {
  setUser: (me: UserDetail | undefined) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (err: string) => void;
}

export const useAuthStore = create<AuthState & Action>()((set) => ({
  user: undefined,
  error: undefined,
  isLoading: true,
  setUser: (me) => {
    set({ user: me });
  },
  setError: (err) => {
    set({ error: err });
  },
  setIsLoading: (isLoading) => {
    set({ isLoading });
  },
}));
