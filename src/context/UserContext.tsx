"use client";

import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useAuthStore } from "../stores/useAuthStore";
import { Token } from "../common/constant";
import { Me } from "../api/utils/axios";
import { UserDetail } from "../types/interface";

export interface UserProviderProps {
  children: React.ReactNode;
}

export const fetchUser = async (
  setUser: (user: UserDetail | undefined) => void,
  setIsLoading: (loading: boolean) => void
) => {
  const token = Cookies.get(Token);
  if (token) {
    try {
      const response = await Me<{ data: UserDetail }>("/auth/me");
      setUser(response.data);
    } catch (err) {
      console.log(err);
      // Cookies.remove(Token);
    }
  } else {
    setUser(undefined);
  }
  setIsLoading(false);
};

export function UserProvider({
  children,
}: UserProviderProps): React.JSX.Element {
  const { setUser, setIsLoading } = useAuthStore();

  useEffect(() => {
    void fetchUser(setUser, setIsLoading);
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
