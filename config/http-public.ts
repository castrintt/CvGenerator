import axios from 'axios';
import type { AxiosError } from 'axios';
import { AppConfig } from '../business/shared/config/app.config';
import { attachGlobalApiLoading } from './global-api-loading';
import { showApiErrorToast } from './api-error';

export const httpPublic = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

attachGlobalApiLoading(httpPublic);

httpPublic.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status !== 401) {
      showApiErrorToast(error);
    }
    return Promise.reject(error);
  },
);
