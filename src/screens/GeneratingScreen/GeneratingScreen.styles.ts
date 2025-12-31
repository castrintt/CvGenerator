import styled, {keyframes} from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: var(--background-color);
    color: var(--text-primary);
`;

export const Spinner = styled.div`
    border: 6px solid rgba(37, 117, 252, 0.1);
    border-top: 6px solid var(--accent-color);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    animation: ${spin} 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
    margin-bottom: 30px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

export const Message = styled.h2`
    color: var(--text-primary);
    font-weight: 600;
    font-size: 1.8rem;
    text-align: center;
`;

export const SuccessIcon = styled.div`
    color: #2ecc71;
    font-size: 80px;
    margin-bottom: 20px;
    background: var(--card-bg);
    width: 120px;
    height: 120px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 10px 30px rgba(46, 204, 113, 0.3);
    
    svg {
        width: 60px;
        height: 60px;
    }
`;