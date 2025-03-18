// import React, { createContext, useState, useEffect, useCallback } from "react";

// import Cookies from "js-cookie";

// interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export interface UserContextValue {
//   user: User | null;
//   error: string | null;
//   isLoading: boolean;
//   checkSession: () => Promise<void>; // Xóa dấu "?" để chắc chắn luôn có giá trị
// }

// export const UserContextInstance = createContext<UserContextValue | null>(null);

// export interface UserProviderProps {
//   children: React.ReactNode;
// }

// export function UserProvider({
//   children,
// }: UserProviderProps): React.JSX.Element {
//   const [user, setUser] = useState<User | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState<boolean>(true);

//   const checkSession = useCallback(async () => {
//     setIsLoading(true);
//     try {
//       const token = Cookies.get("auth_token");
//       if (!token) {
//         setUser(null);
//         setError(null);
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch("/api/me", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       if (!response.ok) {
//         throw new Error("Authentication failed");
//       }

//       const data = await response.json();
//       setUser(data.user);
//       setError(null);
//     } catch (err) {
//       setUser(null);
//       setError("Something went wrong");
//       Cookies.remove("auth_token");
//     } finally {
//       setIsLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     checkSession();
//   }, [checkSession]);

//   return (
//     <UserContextInstance.Provider
//       value={{ user, error, isLoading, checkSession }}
//     >
//       {children}
//     </UserContextInstance.Provider>
//   );
// }
