import React, { createContext, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { User } from "../types/interface";
import { Token } from "../helper/constant";
import { Me } from "../api/utils/axios";
import { useAuthStore } from "../stores/useAuthStore";

export interface UserContextValue {
  user: User | null;
  setUser: (user: User | undefined) => void;
  error: string | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
}

export const UserContextInstance = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const {
    isLoading,
    setError,
    setIsLoading,
    setUser,
    error = null,
    user = null,
  } = useAuthStore();

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get(Token);
      if (!token) {
        setUser(undefined);
        setError("");
        return;
      }
      const response = await Me<{ data: { user: User } }>(token);
      if (!response?.data?.user) {
        throw new Error("Authentication failed");
      }
      setUser(response.data.user);
      setError("");
    } catch (err) {
      setUser(undefined);
      setError("Something went wrong");
      Cookies.remove(Token);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setUser, setError]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  return (
    <UserContextInstance.Provider
      value={{ user, setUser, error, isLoading, checkSession }}
    >
      {children}
    </UserContextInstance.Provider>
  );
}
