import type {
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

import { STORAGE_KEYS } from "@/constants/storage";

export function setupInterceptors() {
  return {
    request: (
      config: InternalAxiosRequestConfig
    ): InternalAxiosRequestConfig => {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },

    response: (error: AxiosError) => {
      if (error.response?.status === 401) {
        localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
        localStorage.removeItem(STORAGE_KEYS.USER);

        window.location.href = "/auth/login";
      }

      return Promise.reject(error);
    },
  };
}