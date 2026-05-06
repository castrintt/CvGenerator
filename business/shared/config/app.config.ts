export const AppConfig = {
  apiBaseUrl: import.meta.env.VITE_API_URL as string,
  onSessionExpired: null as (() => void) | null,
};
