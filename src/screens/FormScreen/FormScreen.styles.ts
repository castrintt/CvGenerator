import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    min-height: 100vh;
    background-color: #FFFFFF;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

export const Sidebar = styled.div`
    width: 320px;
    background-color: #FAFAFA;
    border-right: 1px solid #E0E0E0;
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
        border-bottom: 1px solid #E0E0E0;
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
        color: #333;

        @media (max-width: 768px) {
            font-size: 24px;
        }
    }

    p {
        color: #828282;
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
    color: #333;
    font-size: 20px;
    font-weight: 600;
    display: flex;
    align-items: center;

    &:before {
        content: '';
        display: block;
        width: 4px;
        height: 24px;
        background-color: #2D9CDB;
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
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 24px;
    margin-top: 24px;

    @media (max-width: 480px) {
        grid-template-columns: 1fr;
    }
`;

export const TemplateCard = styled.div<{ $selected: boolean }>`
    border: 2px solid ${props => props.$selected ? '#2D9CDB' : '#E0E0E0'};
    border-radius: 12px;
    padding: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    background: #FFFFFF;
    position: relative;
    overflow: hidden;

    &:hover {
        border-color: ${props => props.$selected ? '#2D9CDB' : '#BDBDBD'};
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    h3 {
        margin: 12px 0 0 0;
        font-size: 14px;
        font-weight: 500;
        color: ${props => props.$selected ? '#2D9CDB' : '#333'};
        text-align: center;
    }
`;

export const TemplatePreview = styled.div<{ $image?: string }>`
    height: 240px;
    background-color: #F5F5F5;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
    background-image: url(${props => props.$image});
    background-size: cover;
    background-position: top center;
    border: 1px solid #eee;

    &:after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.05) 100%);
        pointer-events: none;
    }
`;

export const TextArea = styled.textarea`
    width: 100%;
    padding: 16px;
    border-radius: 8px;
    border: 1px solid #E0E0E0;
    min-height: 140px;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    resize: vertical;
    margin-bottom: 24px;
    transition: all 0.2s ease;
    color: #333;

    &:focus {
        outline: none;
        border-color: #2D9CDB;
        box-shadow: 0 0 0 3px rgba(45, 156, 219, 0.1);
    }

    &::placeholder {
        color: #BDBDBD;
    }
`;

export const Select = styled.select`
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    border: 1px solid #E0E0E0;
    margin-bottom: 24px;
    background-color: white;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    cursor: pointer;
    color: #333;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 16px center;
    background-size: 16px;

    &:focus {
        outline: none;
        border-color: #2D9CDB;
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
    color: ${props => props.$active ? '#2D9CDB' : '#828282'};
    font-weight: ${props => props.$active ? '600' : '400'};
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
        color: ${props => props.$active ? '#2D9CDB' : '#333'};
    }

    span {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: ${props => props.$active ? '#2D9CDB' : 'transparent'};
        border: 1px solid ${props => props.$active ? '#2D9CDB' : '#E0E0E0'};
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
    border-top: 1px solid #E0E0E0;
    margin: 32px 0;
`;

export const ExperienceCard = styled.div`
    background: #FAFAFA;
    border: 1px solid #E0E0E0;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 24px;
    position: relative;
    transition: all 0.2s ease;

    &:hover {
        border-color: #BDBDBD;
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