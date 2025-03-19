import axios, { type AxiosInstance } from "axios";
export const RestApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function Login<T>(email: string, password: string): Promise<T> {
  try {
    const response = await RestApi.post<T>("/auth/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("Error in query:", error);
    throw new Error("Login failed. Please try again later.");
  }
}
