import React from 'react';
import styled from 'styled-components';
import {useTheme} from '../../context/ThemeContext';

const ToggleButton = styled.button`
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--card-bg);
    border: 1px solid var(--border-color);
    border-radius: 50%;
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 1000;
    color: var(--text-primary);
    transition: all 0.3s ease;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);

    &:hover {
        transform: scale(1.1);
    }

    @media (max-width: 480px) {
        top: 12px;
        right: 12px;
        width: 40px;
        height: 40px;
        min-width: 40px;
        min-height: 40px;
    }
`;

export const ThemeToggle: React.FC = () => {
    const {theme, toggleTheme} = useTheme();

    return (
        <ToggleButton onClick={toggleTheme} title={`Mudar para modo ${theme === 'light' ? 'escuro' : 'claro'}`}>
            {theme === 'light' ? '🌙' : '☀️'}
        </ToggleButton>
    );
};