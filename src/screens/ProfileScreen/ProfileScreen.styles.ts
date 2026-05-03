import styled from 'styled-components';

export const Container = styled.div`
    min-height: 100vh;
    min-height: 100dvh;
    background-color: var(--background-color);
    color: var(--text-primary);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px 24px 48px;
    box-sizing: border-box;

    @media (max-width: 480px) {
        padding: 20px 16px 40px;
    }
`;

export const PageWrapper = styled.div`
    width: 100%;
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const BackButton = styled.button`
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    font-size: 13px;
    padding: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 4px;
    transition: color 0.15s;
    align-self: flex-start;

    &:hover {
        color: var(--text-primary);
    }
`;

export const PageHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;

    h1 {
        font-size: 22px;
        font-weight: 700;
        margin: 0;
        color: var(--text-primary);

        &:before {
            content: '';
            display: inline-block;
            width: 4px;
            height: 22px;
            background-color: var(--accent-color);
            margin-right: 12px;
            vertical-align: middle;
            border-radius: 2px;
        }
    }
`;

export const PageSubtitle = styled.p`
    margin: 0 0 0 16px;
    font-size: 13px;
    color: var(--text-secondary);
    line-height: 1.4;
`;

export const UserSummaryCard = styled.div`
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    @media (max-width: 480px) {
        flex-direction: column;
        align-items: flex-start;
    }
`;

export const UserSummaryInfo = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const UserSummaryName = styled.span`
    font-size: 18px;
    font-weight: 600;
    color: var(--text-primary);
`;

export const UserSummaryEmail = styled.span`
    font-size: 13px;
    color: var(--text-secondary);
`;

export const VerifiedBadge = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 500;
    color: #27AE60;
    background: rgba(39, 174, 96, 0.1);
    border: 1px solid rgba(39, 174, 96, 0.25);
    border-radius: 999px;
    padding: 4px 10px;
    flex-shrink: 0;
`;

export const SectionCard = styled.div`
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 14px;
    padding: 24px;

    @media (max-width: 480px) {
        padding: 18px 16px;
    }
`;

export const SectionCardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    gap: 12px;
`;

export const SectionCardTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 15px;
    font-weight: 600;
    color: var(--text-primary);
`;

export const SectionCardIcon = styled.span`
    font-size: 16px;
    line-height: 1;
`;

export const FormRow = styled.div`
    margin-bottom: 16px;

    &:last-of-type {
        margin-bottom: 0;
    }

    label {
        display: block;
        font-size: 13px;
        font-weight: 500;
        margin-bottom: 6px;
        color: var(--text-secondary);
    }
`;

export const FieldValue = styled.div`
    font-size: 15px;
    color: var(--text-primary);
    padding: 10px 0;
    border-bottom: 1px solid var(--border-color);
`;

export const InputWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
`;

export const TextInput = styled.input`
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    font-size: 15px;
    background: var(--input-bg);
    color: var(--text-primary);
    min-height: 44px;
    box-sizing: border-box;
    transition: border-color 0.15s;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
    }

    &[type="password"] {
        padding-right: 44px;
    }
`;

export const PasswordToggle = styled.button`
    position: absolute;
    right: 12px;
    background: none;
    border: none;
    color: var(--text-secondary);
    cursor: pointer;
    padding: 4px;
    display: flex;
    align-items: center;
    font-size: 14px;
    transition: color 0.15s;

    &:hover {
        color: var(--text-primary);
    }
`;

export const PasswordHint = styled.p`
    margin: 6px 0 0 0;
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.4;
`;

export const FormActions = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 20px;
    justify-content: flex-end;
    flex-wrap: wrap;

    button {
        min-height: 44px;
    }
`;
