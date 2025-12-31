import styled from "styled-components";

export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline'; $fullWidth?: boolean }>`
    padding: 12px 24px;
    border-radius: 8px;
    border: ${props => props.$variant === 'outline' ? '1px solid var(--border-color)' : 'none'};
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
    width: ${props => props.$fullWidth ? '100%' : 'auto'};

    background-color: ${props => {
        switch(props.$variant) {
            case 'primary': return 'var(--button-bg)';
            case 'secondary': return 'var(--secondary-color)';
            case 'outline': return 'transparent';
            default: return 'var(--button-bg)';
        }
    }};

    color: ${props => {
        switch(props.$variant) {
            case 'primary': return 'var(--button-text)';
            case 'secondary': return 'var(--text-primary)';
            case 'outline': return 'var(--text-primary)';
            default: return 'var(--button-text)';
        }
    }};

    &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
        border-color: ${props => props.$variant === 'outline' ? 'var(--text-primary)' : 'transparent'};
    }

    &:disabled {
        background-color: var(--border-color);
        color: var(--text-secondary);
        cursor: not-allowed;
        transform: none;
    }
`;