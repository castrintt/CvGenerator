import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      // Adicione outros matchers se necessário, mas o import acima deve cobrir a maioria
    }
  }
}