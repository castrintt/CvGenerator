import { useEffect, useState, type FC } from 'react';
import { subscribeGlobalApiLoading } from '../../../config/global-api-loading';
import { LoadingBarFill, LoadingBarHost } from './GlobalApiLoading.styles';

export const GlobalApiLoadingBar: FC = () => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return subscribeGlobalApiLoading((pendingCount) => {
      setIsActive(pendingCount > 0);
    });
  }, []);

  if (!isActive) {
    return null;
  }

  return (
    <LoadingBarHost
      aria-busy
      aria-live="polite"
      role="progressbar"
    >
      <LoadingBarFill />
    </LoadingBarHost>
  );
};
