import type { AxiosError, AxiosInstance } from 'axios';

type GlobalApiLoadingListener = (pendingRequestCount: number) => void;

const listeners = new Set<GlobalApiLoadingListener>();

let pendingRequestCount = 0;

export function getPendingRequestCount(): number {
  return pendingRequestCount;
}

export function subscribeGlobalApiLoading(listener: GlobalApiLoadingListener): () => void {
  listeners.add(listener);
  listener(pendingRequestCount);
  return () => {
    listeners.delete(listener);
  };
}

function notifyListeners(): void {
  listeners.forEach((listener) => {
    listener(pendingRequestCount);
  });
}

function incrementPendingRequests(): void {
  pendingRequestCount += 1;
  notifyListeners();
}

function decrementPendingRequests(): void {
  if (pendingRequestCount <= 0) {
    pendingRequestCount = 0;
    notifyListeners();
    return;
  }
  pendingRequestCount -= 1;
  notifyListeners();
}

/** Apenas para testes — zera o contador e notifica ouvintes. */
export function resetGlobalApiLoadingForTests(): void {
  pendingRequestCount = 0;
  notifyListeners();
}

/**
 * Deve ser registrado antes de outros interceptors de resposta na mesma instância:
 * no Axios, o primeiro interceptor registrado é o primeiro a tratar sucesso/erro.
 */
export function attachGlobalApiLoading(client: AxiosInstance): void {
  client.interceptors.request.use((config) => {
    if (!config.skipGlobalLoading) {
      incrementPendingRequests();
    }
    return config;
  });

  client.interceptors.response.use(
    (response) => {
      if (!response.config.skipGlobalLoading) {
        decrementPendingRequests();
      }
      return response;
    },
    (error: AxiosError) => {
      const cfg = error.config;
      if (cfg && !cfg.skipGlobalLoading) {
        decrementPendingRequests();
      }
      return Promise.reject(error);
    },
  );
}
