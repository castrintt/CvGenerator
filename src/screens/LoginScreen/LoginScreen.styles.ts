import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 40px 24px;
    background-color: var(--background-color);
    color: var(--text-primary);
    position: relative;

    @media (max-width: 480px) {
        padding: 24px 16px;
    }
`;

export const Card = styled.div`
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 16px;
    padding: 40px;
    width: 100%;
    max-width: 420px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);

    @media (max-width: 480px) {
        padding: 24px 20px;
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 32px;

    h1 {
        font-size: 24px;
        margin-bottom: 8px;
        color: var(--text-primary);

        @media (max-width: 480px) {
            font-size: 20px;
        }
    }

    p {
        color: var(--text-secondary);
        font-size: 14px;

        @media (max-width: 480px) {
            font-size: 13px;
        }
    }
`;

export const Divider = styled.div`
    display: flex;
    align-items: center;
    margin: 24px 0;
    gap: 16px;

    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 1px;
        background: var(--border-color);
    }

    span {
        color: var(--text-secondary);
        font-size: 12px;
    }
`;

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 24px;

    button {
        min-height: 44px;
    }
`;

export const BackButton = styled.button`
    position: absolute;
    top: 24px;
    left: 24px;
    background: transparent;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 8px 16px;
    color: var(--text-primary);
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
    min-height: 44px;

    &:hover {
        border-color: var(--accent-color);
        color: var(--accent-color);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        top: 16px;
        left: 16px;
        padding: 10px 14px;
    }
`;

export const ErrorMessage = styled.span`
    color: #EB5757;
    font-size: 13px;
    display: block;
    margin-top: 12px;
    text-align: center;
`;

export const ToggleMode = styled.p`
    text-align: center;
    margin-top: 24px;
    font-size: 14px;
    color: var(--text-secondary);

    button {
        background: none;
        border: none;
        color: var(--accent-color);
        cursor: pointer;
        font-weight: 500;
        text-decoration: underline;

        &:hover {
            opacity: 0.9;
        }

        &:disabled {
            opacity: 0.45;
            cursor: not-allowed;
            text-decoration: none;
        }
    }
`;
