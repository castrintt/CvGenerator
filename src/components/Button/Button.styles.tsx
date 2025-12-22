import styled from "styled-components";

export const StyledButton = styled.button<{ $variant?: 'primary' | 'secondary' | 'outline'; $fullWidth?: boolean }>`
    padding: 12px 24px;
    border-radius: 8px;
    border: ${props => props.$variant === 'outline' ? '1px solid #E0E0E0' : 'none'};
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
    width: ${props => props.$fullWidth ? '100%' : 'auto'};

    background-color: ${props => {
        switch(props.$variant) {
            case 'primary': return '#000000';
            case 'secondary': return '#F2F2F2';
            case 'outline': return 'transparent';
            default: return '#000000';
        }
    }};

    color: ${props => {
        switch(props.$variant) {
            case 'primary': return '#FFFFFF';
            case 'secondary': return '#333333';
            case 'outline': return '#333333';
            default: return '#FFFFFF';
        }
    }};

    &:hover {
        opacity: 0.9;
        transform: translateY(-1px);
    }

    &:disabled {
        background-color: #E0E0E0;
        color: #828282;
        cursor: not-allowed;
        transform: none;
    }
`;