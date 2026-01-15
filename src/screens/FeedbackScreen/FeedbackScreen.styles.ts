import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: var(--background-color);

    @media (max-width: 1024px) {
        flex-direction: column-reverse;
    }
`;

export const Sidebar = styled.div`
    width: 400px;
    background: var(--sidebar-bg);
    color: var(--text-primary);
    padding: 40px;
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    z-index: 10;
    border-right: 1px solid var(--border-color);

    @media (max-width: 1024px) {
        position: relative;
        width: 100%;
        height: auto;
        box-shadow: none;
        border-right: none;
        border-top: 1px solid var(--border-color);
    }

    @media (max-width: 768px) {
        padding: 24px;
    }
`;

export const PreviewArea = styled.div`
    flex: 1;
    margin-left: 400px;
    padding: 50px;
    display: flex;
    justify-content: center;
    overflow-y: auto;
    background-color: var(--secondary-color);

    @media (max-width: 1024px) {
        margin-left: 0;
        padding: 40px 20px;
        flex: none;
    }
`;

export const ResumePreview = styled.div`
    width: 210mm;
    min-height: 297mm;
    background-color: white;
    box-shadow: 0 10px 50px rgba(0, 0, 0, 0.15);
    padding: 0;
    box-sizing: border-box;
    transform: scale(0.9);
    transform-origin: top center;
    color: black;

    @media (max-width: 1024px) {
        transform: scale(0.8);
        margin-bottom: calc(297mm * (0.8 - 1)); /* Puxa o conteúdo de baixo */
    }

    @media (max-width: 768px) {
        transform: scale(0.6);
        margin-bottom: calc(297mm * (0.6 - 1));
    }

    @media (max-width: 480px) {
        transform: scale(0.45);
        margin-bottom: calc(297mm * (0.45 - 1));
    }
`;

export const FeedbackForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
        font-size: 15px;
        line-height: 1.6;
        opacity: 0.9;
        color: var(--text-primary);
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 15px;
    border-radius: 12px;
    border: 1px solid var(--border-color);
    min-height: 180px;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    resize: vertical;
    background-color: var(--input-bg);
    color: var(--text-primary);
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 4px rgba(45, 156, 219, 0.1);
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

export const DownloadSection = styled.div`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const FormatSelector = styled.div`
    display: flex;
    gap: 15px;
    margin-bottom: 10px;
`;

export const FormatOption = styled.button<{ $selected: boolean }>`
    flex: 1;
    padding: 10px;
    border: 2px solid ${props => props.$selected ? 'var(--accent-color)' : 'var(--border-color)'};
    background-color: ${props => props.$selected ? 'rgba(45, 156, 219, 0.1)' : 'transparent'};
    color: var(--text-primary);
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    font-family: 'Inter', sans-serif;
    transition: all 0.2s ease;

    &:hover {
        background-color: var(--secondary-color);
    }
`;

export const Title = styled.h2`
    margin-top: 0;
    margin-bottom: 20px;
    color: var(--text-primary);
    font-size: 1.8rem;
    font-weight: 700;
`;

export const SuccessMessage = styled.div`
    background-color: rgba(46, 204, 113, 0.1);
    color: #27ae60;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 500;
    border: 1px solid #27ae60;
`;