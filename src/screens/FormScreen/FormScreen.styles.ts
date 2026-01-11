import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: var(--background-color);
    color: var(--text-primary);

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Sidebar = styled.div`
    width: 320px;
    background-color: var(--sidebar-bg);
    border-right: 1px solid var(--border-color);
    padding: 40px 24px;
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100vh;
    overflow-y: auto;
    z-index: 10;

    @media (max-width: 768px) {
        width: 100%;
        height: auto;
        position: relative;
        border-right: none;
        border-bottom: 1px solid var(--border-color);
        padding: 20px;
    }
`;

export const MainContent = styled.div`
    flex: 1;
    margin-left: 320px;
    padding: 60px 80px;
    max-width: 1200px;

    @media (max-width: 1024px) {
        padding: 40px;
    }

    @media (max-width: 768px) {
        margin-left: 0;
        padding: 24px;
        width: 100%;
    }
`;

export const Header = styled.div`
    margin-bottom: 40px;

    h1 {
        font-size: 32px;
        margin-bottom: 12px;
        color: var(--text-primary);

        @media (max-width: 768px) {
            font-size: 24px;
        }
    }

    p {
        color: var(--text-secondary);
        font-size: 16px;

        @media (max-width: 768px) {
            font-size: 14px;
        }
    }
`;

export const Section = styled.section`
    margin-bottom: 48px;
    scroll-margin-top: 20px;

    &:last-child {
        margin-bottom: 0;
    }
`;

export const Title = styled.h2`
    margin-bottom: 24px;
    color: var(--text-primary);
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;

    &:before {
        content: '';
        display: block;
        width: 4px;
        height: 24px;
        background-color: var(--accent-color);
        margin-right: 12px;
        border-radius: 2px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }
`;

export const Row = styled.div`
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-bottom: 16px;

    & > div {
        flex: 1;
        min-width: 240px;

        @media (max-width: 480px) {
            min-width: 100%;
        }
    }
`;

export const TemplateGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 24px;
    margin-top: 24px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const TemplateCard = styled.div<{ $selected: boolean }>`
    border: 2px solid ${props => props.$selected ? 'var(--accent-color)' : 'var(--border-color)'};
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: var(--card-bg);
    position: relative;
    overflow: hidden;

    &:hover {
        border-color: ${props => props.$selected ? 'var(--accent-color)' : 'var(--text-secondary)'};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    h3 {
        margin: 12px 0 0 0;
        font-size: 14px;
        font-weight: 500;
        color: ${props => props.$selected ? 'var(--accent-color)' : 'var(--text-primary)'};
        text-align: center;
    }
`;

export const TemplateMiniature = styled.div`
    width: 100%;
    height: 300px;
    background-color: white;
    overflow: hidden;
    position: relative;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    pointer-events: none; /* Prevent interaction with the resume content */

    & > div {
        transform: scale(0.28); 
        transform-origin: top left;
        width: 210mm; 
        min-height: 297mm; 
        position: absolute;
        top: 0;
        left: 0;
        background-color: white;
        color: black; /* Ensure resume is always black on white */
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    min-height: 140px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    resize: vertical;
    margin-bottom: 24px;
    transition: all 0.2s ease;
    color: var(--text-primary);
    background-color: var(--input-bg);

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(45, 156, 219, 0.1);
    }

    &::placeholder {
        color: var(--text-secondary);
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid var(--border-color);
    margin-bottom: 24px;
    background-color: var(--input-bg);
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    cursor: pointer;
    color: var(--text-primary);
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 16px;

    &:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 3px rgba(45, 156, 219, 0.1);
    }
`;

export const StepIndicator = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 40px;

    @media (max-width: 768px) {
        flex-direction: row;
        overflow-x: auto;
        padding-bottom: 10px;
        margin-top: 20px;
        gap: 16px;

        /* Hide scrollbar for cleaner look */
        -ms-overflow-style: none;  /* IE and Edge */
        scrollbar-width: none;  /* Firefox */
        &::-webkit-scrollbar {
            display: none;
        }
    }
`;

export const Step = styled.div<{ $active: boolean }>`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${props => props.$active ? 'var(--accent-color)' : 'var(--text-secondary)'};
    font-weight: ${props => props.$active ? '600' : '400'};
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        color: ${props => props.$active ? 'var(--accent-color)' : 'var(--text-primary)'};
    }

    span {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${props => props.$active ? 'var(--accent-color)' : 'transparent'};
        border: 1px solid ${props => props.$active ? 'var(--accent-color)' : 'var(--border-color)'};
        color: ${props => props.$active ? '#FFF' : 'inherit'};
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        flex-shrink: 0;
    }
`;

export const Divider = styled.hr`
    border: none;
    border-top: 1px solid var(--border-color);
    margin: 32px 0;
`;

export const ExperienceCard = styled.div`
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    position: relative;
    transition: all 0.2s ease;

    &:hover {
        border-color: var(--text-secondary);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    @media (max-width: 480px) {
        padding: 16px;
    }
`;

export const RemoveButton = styled.button`
    position: absolute;
    top: 16px;
    right: 16px;
    background: transparent;
    border: none;
    color: #EB5757;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    border-radius: 4px;

    &:hover {
        background-color: rgba(235, 87, 87, 0.1);
    }

    @media (max-width: 480px) {
        position: static;
        margin-bottom: 16px;
        padding: 0;
    }
`;

export const SubmitButtonContainer = styled.div`
    text-align: right;
    margin-top: 60px;
    margin-bottom: 40px;
    padding: 20px 0;

    @media (max-width: 768px) {
        text-align: center;

        button {
            width: 100%;
        }
    }
`;

export const PrivacyNotice = styled.div`
    background-color: rgba(45, 156, 219, 0.1);
    border: 1px solid var(--accent-color);
    border-radius: 8px;
    padding: 16px;
    margin-bottom: 24px;
    color: var(--text-primary);
    font-size: 14px;
    line-height: 1.5;
    
    strong {
        color: var(--accent-color);
    }
`;

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 20px;
    cursor: pointer;
    overflow: hidden; /* Garante que nada vaze do overlay */
`;

export const ModalContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    outline: none;
    background: transparent;
    box-shadow: none;
    padding: 0;
    position: relative;
    cursor: default;
    max-width: 100%;
    max-height: 100%;
    overflow: auto; /* Permite scroll se necessário, embora o scale deva evitar */
`;

export const PreviewContainer = styled.div<{ $scale: number }>`
    width: 210mm;
    height: 297mm;
    background-color: white;
    transform: scale(${props => props.$scale});
    transform-origin: center center;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    transition: transform 0.2s ease;
    
    /* Ensure text is black even in dark mode */
    color: black;

    /* Fix para evitar overflow horizontal em mobile */
    @media (max-width: 768px) {
        /* Em telas pequenas, garantimos que o container não force a largura */
        max-width: 90vw; 
        /* O scale já cuida do tamanho visual, mas o max-width ajuda o navegador a entender os limites */
    }
`;

export const CloseButton = styled.button`
    position: absolute;
    top: -50px;
    right: 0;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    transition: all 0.2s;
    
    &:hover {
        background: rgba(235, 87, 87, 0.8);
        transform: scale(1.1);
    }

    @media (max-width: 768px) {
        top: 10px;
        right: 10px;
        background: white;
        color: #333;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        position: fixed;
    }
`;