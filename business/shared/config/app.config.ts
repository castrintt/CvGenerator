export const AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_URL as string || 'http://localhost:3000',
  onSessionExpired: null as (() => void) | null,
};
