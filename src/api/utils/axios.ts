import axios, { type AxiosInstance } from "axios";
import { Token } from "../../helper/constant";
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

export async function Me<T>(token: string): Promise<T> {
  try {
    const response = await RestApi.get<T>("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error in query:", error);
    throw new Error("Query failed. Please try again later.");
  }
}
