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

    @media (max-width: 480px) {
        padding: 24px 16px;
    }
`;

export const Header = styled.div`
    text-align: center;
    margin-bottom: 48px;

    h1 {
        font-size: 36px;
        margin-bottom: 12px;
        color: var(--text-primary);

        @media (max-width: 768px) {
            font-size: 28px;
        }

        @media (max-width: 480px) {
            font-size: 24px;
        }
    }

    p {
        color: var(--text-secondary);
        font-size: 18px;

        @media (max-width: 768px) {
            font-size: 16px;
        }

        @media (max-width: 480px) {
            font-size: 14px;
        }
    }
`;

export const OptionsGrid = styled.div`
    display: flex;
    gap: 32px;
    flex-wrap: wrap;
    justify-content: center;
    max-width: 800px;

    @media (max-width: 768px) {
        flex-direction: column;
        width: 100%;
        gap: 20px;
    }

    @media (max-width: 480px) {
        gap: 16px;
    }
`;

export const OptionCard = styled.div`
    background: var(--card-bg);
    border: 2px solid var(--border-color);
    border-radius: 16px;
    padding: 40px 48px;
    min-width: 280px;
    max-width: 360px;
    cursor: pointer;
    transition: all 0.2s ease;
    text-align: center;

    &:hover {
        border-color: var(--accent-color);
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    }

    @media (max-width: 768px) {
        max-width: 100%;
        min-width: 0;
        width: 100%;
    }

    @media (max-width: 480px) {
        padding: 24px 20px;
    }

    h2 {
        font-size: 20px;
        margin-bottom: 12px;
        color: var(--text-primary);

        &:before {
            content: '';
            display: block;
            width: 40px;
            height: 4px;
            background-color: var(--accent-color);
            margin: 0 auto 16px;
            border-radius: 2px;
        }

        @media (max-width: 480px) {
            font-size: 18px;
        }
    }

    p {
        color: var(--text-secondary);
        font-size: 14px;
        line-height: 1.5;

        @media (max-width: 480px) {
            font-size: 13px;
        }
    }
`;
