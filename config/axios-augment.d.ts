import 'axios';

declare module 'axios' {
  export interface AxiosRequestConfig {
    /** Quando true, não altera o contador global de loading HTTP. */
    skipGlobalLoading?: boolean;
  }
}
