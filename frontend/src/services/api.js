import axios from 'axios';

import {
  clearStoredAuth,
  getStoredToken,
} from './authStorage';

const apiBaseUrl =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV
    ? 'http://localhost:8080'
    : '/');

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = getStoredToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      clearStoredAuth();
      window.dispatchEvent(
        new CustomEvent(
          'auth:unauthorized',
          {
            detail: {
              message:
                error?.response?.data
                  ?.message ||
                'Your session has expired. Please sign in again.',
            },
          },
        ),
      );
    }

    return Promise.reject(error);
  },
);

export default api;
