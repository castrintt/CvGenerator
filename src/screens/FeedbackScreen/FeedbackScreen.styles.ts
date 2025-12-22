import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #f4f7f6;
`;

export const Sidebar = styled.div`
    width: 400px;
    background: linear-gradient(180deg, #6a11cb 0%, #2575fc 100%);
    color: white;
    padding: 40px;
    box-shadow: 5px 0 25px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    z-index: 10;
`;

export const PreviewArea = styled.div`
    flex: 1;
    margin-left: 400px;
    padding: 50px;
    display: flex;
    justify-content: center;
    overflow-y: auto;
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
`;

export const FeedbackForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 20px;

    p {
        font-size: 15px;
        line-height: 1.6;
        opacity: 0.9;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 15px;
    border-radius: 12px;
    border: none;
    min-height: 180px;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    resize: vertical;
    background-color: rgba(255, 255, 255, 0.1);
    color: white;
    transition: all 0.2s ease;

    &:focus {
        outline: none;
        background-color: rgba(255, 255, 255, 0.2);
        box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
    }

    &::placeholder {
        color: rgba(255, 255, 255, 0.6);
    }
`;

export const DownloadSection = styled.div`
    margin-top: 30px;
    padding-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.2);
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
    border: 2px solid ${props => props.$selected ? '#fff' : 'rgba(255, 255, 255, 0.5)'};
    background-color: ${props => props.$selected ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    transition: all 0.2s ease;

    &:hover {
        background-color: rgba(255, 255, 255, 0.1);
    }
`;

export const Title = styled.h2`
    margin-top: 0;
    margin-bottom: 20px;
    color: white;
    font-size: 1.8rem;
    font-weight: 700;
`;

export const SuccessMessage = styled.div`
    background-color: rgba(46, 204, 113, 0.8);
    color: white;
    padding: 20px;
    border-radius: 12px;
    margin-bottom: 20px;
    text-align: center;
    font-weight: 500;
`;