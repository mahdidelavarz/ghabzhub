// lib/http.ts
import axios from "axios";
import toast from "react-hot-toast";

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Response interceptor to handle 401 errors
http.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if error is 401 (Unauthorized)
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Clear all local data
        localStorage.removeItem("access_token");
        localStorage.removeItem("auth-storage");
        localStorage.removeItem("plate-storage"); // If you persist plate store
        
        // Redirect to login page
        window.location.href = "/login";
        
        // Show toast message
        toast.error("نشست شما منقضی شده است. لطفاً مجدداً وارد شوید");
      }
    }
    return Promise.reject(error);
  }
);