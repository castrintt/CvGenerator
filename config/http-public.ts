import axios from 'axios';
import type { AxiosError } from 'axios';
import { AppConfig } from '../business/shared/config/app.config';
import { showApiErrorToast } from './api-error';

export const httpPublic = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

httpPublic.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    showApiErrorToast(error);
    return Promise.reject(error);
  },
);
