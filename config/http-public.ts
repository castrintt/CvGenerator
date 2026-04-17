import axios from 'axios';
import { AppConfig } from '../business/shared/config/app.config';

export const httpPublic = axios.create({
  baseURL: AppConfig.apiBaseUrl,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
