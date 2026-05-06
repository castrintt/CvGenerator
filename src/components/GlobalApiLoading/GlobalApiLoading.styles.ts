import styled, { keyframes } from 'styled-components';

const indeterminate = keyframes`
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(350%);
  }
`;

export const LoadingBarHost = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9998;
  pointer-events: none;
  overflow: hidden;
  background: transparent;
`;

export const LoadingBarFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 35%;
  border-radius: 0 2px 2px 0;
  background: var(--accent-color, #2d9cdb);
  animation: ${indeterminate} 1.1s ease-in-out infinite;
`;
