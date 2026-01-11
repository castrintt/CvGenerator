import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '../../src/context/ThemeContext';
import '@testing-library/jest-dom';

const TestComponent = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <div>
            <span data-testid="theme-value">{theme}</span>
            <button onClick={toggleTheme}>Toggle</button>
        </div>
    );
};

describe('ThemeContext', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('provides default theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    });

    it('toggles theme', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
        
        fireEvent.click(button);
        expect(screen.getByTestId('theme-value')).toHaveTextContent('light');
    });

    it('persists theme in localStorage', () => {
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(localStorage.getItem('theme')).toBe('dark');
    });

    it('loads theme from localStorage', () => {
        localStorage.setItem('theme', 'dark');
        
        render(
            <ThemeProvider>
                <TestComponent />
            </ThemeProvider>
        );
        
        expect(screen.getByTestId('theme-value')).toHaveTextContent('dark');
    });
});
