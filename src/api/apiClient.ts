import axios from "axios";

import { ENV } from "@/config/env";
import { setupInterceptors } from "./interceptors";

export const apiClient = axios.create({
  baseURL: ENV.API_URL,

  timeout: ENV.REQUEST_TIMEOUT,

  headers: {
    "Content-Type": "application/json",
  },
});

const interceptor = setupInterceptors();

apiClient.interceptors.request.use(interceptor.request);

apiClient.interceptors.response.use(
  response => response,
  interceptor.response
);