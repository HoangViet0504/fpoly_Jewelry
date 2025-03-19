import React, { createContext, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import { User } from "../types/interface";

export interface UserContextValue {
  user: User | null;
  setUser: (user: User | null) => void; // ✅ Thêm hàm này để cập nhật user
  error: string | null;
  isLoading: boolean;
  checkSession: () => Promise<void>;
}

export const UserContextInstance = createContext<UserContextValue | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkSession = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = Cookies.get("auth_token");
      if (!token) {
        setUser(null);
        setError(null);
        setIsLoading(false);
        return;
      }

      const response = await fetch("http://localhost:3000/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      setUser(data.user);
      setError(null);
    } catch (err) {
      setUser(null);
      setError("Something went wrong");
      Cookies.remove("auth_token");
    } finally {
      setIsLoading(false);
    }
  }, []);

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
