// import React, { createContext, useEffect, useCallback } from "react";
// import Cookies from "js-cookie";
// import { User } from "../types/interface";
// import { Token } from "../helper/constant";
// import { Me } from "../api/utils/axios";
// import { useAuthStore } from "../stores/useAuthStore";

// export interface UserContextValue {
//   user: User | null;
//   setUser: (user: User | undefined) => void;
//   error: string | null;
//   isLoading: boolean;
//   checkSession: () => Promise<void>;
// }

// export const UserContextInstance = createContext<UserContextValue | null>(null);

// export function UserProvider({ children }: { children: React.ReactNode }) {
//   const { isLoading, setError, setIsLoading, setUser, error, user } =
//     useAuthStore();

//   const checkSession = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = Cookies.get(Token);
//       if (!token) {
//         setUser(undefined);
//         setError("");
//         return;
//       }
//       const response = await Me<{ data: { user: User } }>(token);
//       if (!response?.data?.user) {
//         throw new Error("Authentication failed");
//       }
//       setUser(response.data.user);
//       setError("");
//     } catch (err) {
//       setUser(undefined);
//       setError("Something went wrong");
//       Cookies.remove(Token);
//     } finally {
//       setIsLoading(false);
//     }
//   }, [setIsLoading, setUser, setError]);

//   useEffect(() => {
//     checkSession();
//   }, [checkSession]);

//   return (
//     <UserContextInstance.Provider
//       value={{ user, setUser, error, isLoading, checkSession }}
//     >
//       {children}
//     </UserContextInstance.Provider>
//   );
// }

"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "../stores/useAuthStore";
import { Token } from "../helper/constant";
import { FetchParamsHaveToken, Me } from "../api/utils/axios";
import { User, UserDetail } from "../types/interface";

export interface UserProviderProps {
  children: React.ReactNode;
}

export function UserProvider({
  children,
}: UserProviderProps): React.JSX.Element {
  const { setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get(Token);
      if (token) {
        try {
          const response = await Me<{ data: UserDetail }>("/auth/me");
          setUser(response.data);
          setIsLoading(false);
        } catch (err) {
          console.log(err);
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    void fetchUser(); // gọi async function trong useEffect
  }, []);

  return <>{children}</>;
}

// async function getUserById() {
//   try {
//     const response = await FetchParamsHaveToken<{ data: UserDetail }>(
//       "/getUserAdmin",
//       Number(user?.id_user)
//     );
//     setUserDetail(response.data);
//   } catch (error) {}
// }
