import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 24px;
    width: 100%;
`;

export const Label = styled.label`
    margin-bottom: 8px;
    font-weight: 500;
    font-size: 14px;
    color: var(--text-primary);
`;

export const StyledInput = styled.input<{ $hasError?: boolean }>`
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid ${props => props.$hasError ? '#EB5757' : 'var(--border-color)'};
    font-size: 14px;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;
    background-color: var(--input-bg);
    color: var(--text-primary);

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(45, 156, 219, 0.1);
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

export const ErrorMessage = styled.span`
    color: #EB5757;
    font-size: 12px;
    margin-top: 6px;
    font-weight: 400;
`;
