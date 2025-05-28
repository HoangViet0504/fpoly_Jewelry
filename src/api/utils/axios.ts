import axios, { type AxiosInstance } from "axios";
import { Token } from "../../common/constant";
import Cookies from "js-cookie";
import { ToastMessage } from "../../components/ToastMessage";

export const RestApi: AxiosInstance = axios.create({
    baseURL: "https://edu.appcloudhub.com/backend",
    // baseURL: "http://89.116.21.73:8088",
    // baseURL: "http://localhost:3000",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

export async function Login<T>(email: string, password: string): Promise<T> {
    try {
        const response = await RestApi.post<T>("/auth/login", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        console.error("Error in query:", error);
        throw new Error("Email hoặc mật khẩu không đúng.");
    }
}

export async function Me<T>(url: string): Promise<T> {
    try {
        const response = await RestApi.get<T>(url, {
            headers: { Authorization: `Bearer ${Cookies.get(Token)}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error in query:", error);
        throw new Error("Query failed. Please try again later.");
    }
}

export async function GetListHaveToken<T>(url: string): Promise<T> {
    try {
        const response = await RestApi.get<T>(url, {
            headers: { Authorization: `Bearer ${Cookies.get(Token)}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error in query:", error);
        throw new Error("Query failed. Please try again later.");
    }
}

export async function DeleteItemHaveToken<T>(
    url: string,
    params: unknown
): Promise<T> {
    try {
        const response = await RestApi.post<T>(url, params, {
            headers: { Authorization: `Bearer ${Cookies.get(Token)}` },
        });
        return response.data;
    } catch (error) {
        console.log(error);

        if (axios.isAxiosError(error) && error.response) {
            ToastMessage("error", error.response.data.message);
        }
        throw new Error("Query failed. Please try again later.");
    }
}

export async function PostNoToken<T>(url: string, params: unknown): Promise<T> {
    try {
        const response = await RestApi.post<T>(url, params);
        return response.data;
    } catch (error) {
        console.log(error);
        throw new Error("Query By Id Failed. Please try again later.");
    }
}

export async function FetchParamsHaveToken<T>(
    url: string,
    id: number
): Promise<T> {
    try {
        const response = await RestApi.get<T>(url, {
            params: {
                id,
            },
            headers: { Authorization: `Bearer ${Cookies.get(Token)}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error in query:", error);
        throw new Error("Query By Id Failed. Please try again later.");
    }
}

export async function FetchParams<T>(url: string, id: number): Promise<T> {
    try {
        const response = await RestApi.get<T>(url, {
            params: {
                id,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error in query:", error);
        throw new Error("Query By Id Failed. Please try again later.");
    }
}

export async function GetList<T>(url: string): Promise<T> {
    try {
        const response = await RestApi.get<T>(url);
        return response.data;
    } catch (error) {
        console.error("Error in query:", error);
        throw new Error("Query failed. Please try again later.");
    }
}

export async function GetListByParams<T>(
    url: string,
    keyword: string
): Promise<T> {
    try {
        const response = await RestApi.get<T>(url, {
            params: {
                keyword,
            },
            headers: { Authorization: `Bearer ${Cookies.get(Token)}` },
        });
        return response.data;
    } catch (error) {
        console.error("Error in query:", error);
        throw new Error("Query failed. Please try again later.");
    }
}
