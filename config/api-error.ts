import axios from 'axios';
import { toast } from 'sonner';

export function getApiErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data != null && typeof data === 'object') {
      const record = data as Record<string, unknown>;
      const message = record.message;
      if (typeof message === 'string' && message.trim()) return message;
      if (Array.isArray(message) && message.every((m): m is string => typeof m === 'string')) {
        return message.join(', ');
      }
      const errorField = record.error;
      if (typeof errorField === 'string' && errorField.trim()) return errorField;
    }
    if (error.response?.status !== undefined) {
      const statusText = error.response.statusText?.trim();
      if (statusText) return `${statusText} (${error.response.status})`;
      return `Erro ${error.response.status}`;
    }
  }
  if (error instanceof Error && error.message) return error.message;
  return 'Ocorreu um erro inesperado.';
}

export function showApiErrorToast(error: unknown): void {
  toast.error(getApiErrorMessage(error));
}
