import type { InternalAxiosRequestConfig } from "axios";

export const axiosAuthenticationInterceptor = {
  onFulfilled: (config: InternalAxiosRequestConfig) => {
    const token = 'test-token-123';
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  onRejected: (error: unknown) => {
    return Promise.reject(error);
  },
};
