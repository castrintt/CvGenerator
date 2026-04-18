import axios from 'axios';
import type { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { AppConfig } from '../business/shared/config/app.config';
import { ApiRoutes } from '../business/shared/config/api-routes.config';
import { showApiErrorToast } from './api-error';
import { httpPublic } from './http-public';

interface RetryableConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

interface QueueItem {
  resolve: () => void;
  reject: (error: unknown) => void;
}

let isRefreshing = false;
const failedQueue: QueueItem[] = [];

function drainQueue(error?: unknown): void {
  if (error) {
    failedQueue.forEach(({ reject }) => reject(error));
  } else {
    failedQueue.forEach(({ resolve }) => resolve());
  }
  failedQueue.length = 0;
}

export const httpPrivate = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

httpPrivate.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status !== 401) {
      showApiErrorToast(error);
      return Promise.reject(error);
    }

    const originalConfig = error.config as RetryableConfig;

    if (originalConfig._retry) {
      showApiErrorToast(error);
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => httpPrivate(originalConfig));
    }

    originalConfig._retry = true;
    isRefreshing = true;

    try {
      await httpPublic.post(ApiRoutes.auth.refresh);
      drainQueue();
      return httpPrivate(originalConfig);
    } catch (refreshError) {
      drainQueue(refreshError);
      AppConfig.onSessionExpired?.();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);
