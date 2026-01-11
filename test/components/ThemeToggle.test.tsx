import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeToggle } from '../../src/components/ThemeToggle/ThemeToggle';
import { ThemeProvider } from '../../src/context/ThemeContext';
import '@testing-library/jest-dom';

describe('ThemeToggle Component', () => {
    it('renders correctly', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        const button = screen.getByRole('button');
        expect(button).toBeInTheDocument();
    });

    it('toggles theme on click', () => {
        render(
            <ThemeProvider>
                <ThemeToggle />
            </ThemeProvider>
        );
        const button = screen.getByRole('button');
        
        // Initial state (assuming light theme default)
        expect(button).toHaveTextContent('🌙');
        
        // Click to toggle
        fireEvent.click(button);
        expect(button).toHaveTextContent('☀️');
        
        // Click to toggle back
        fireEvent.click(button);
        expect(button).toHaveTextContent('🌙');
    });
});
