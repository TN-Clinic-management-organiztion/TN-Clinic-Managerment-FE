// src/lib/http/client.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const session = await getSession();
    const accessToken = (session as any)?.access_token;
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.data?.statusCode === 401 && typeof window !== "undefined") {
      console.log("Token hết hạn, chuyển hướng đến đăng nhập");
      await signOut({ redirect: false }); 
      window.location.href = "/login";
    }
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosInstance;