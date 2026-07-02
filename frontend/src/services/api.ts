import axios, { AxiosError, type AxiosInstance } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 30000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("sharanai-token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export interface ApiErrorShape {
  message: string;
  status?: number;
  details?: unknown;
}

export function normalizeError(err: unknown): ApiErrorShape {
  if (err instanceof AxiosError) {
    const status = err.response?.status;
    const data = err.response?.data as { detail?: string; message?: string } | undefined;
    const message =
      data?.detail || data?.message || err.message || "Network error — could not reach the SharanAI backend.";
    return { message, status, details: data };
  }
  if (err instanceof Error) return { message: err.message };
  return { message: "Unknown error" };
}

api.interceptors.response.use(
  (r) => r,
  (error) => Promise.reject(normalizeError(error)),
);
