import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { GeneratingScreen } from '../../src/screens/GeneratingScreen/GeneratingScreen';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock framer-motion to avoid animation issues in tests
jest.mock('framer-motion', () => ({
    motion: {
        div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    },
}));

describe('GeneratingScreen', () => {
    it('shows loading state initially', () => {
        render(
            <BrowserRouter>
                <GeneratingScreen />
            </BrowserRouter>
        );
        
        expect(screen.getByText('Gerando seu currículo profissional...')).toBeInTheDocument();
    });

    it('shows success state after timeout', async () => {
        jest.useFakeTimers();
        
        render(
            <BrowserRouter>
                <GeneratingScreen />
            </BrowserRouter>
        );
        
        // Fast-forward time
        jest.advanceTimersByTime(3000);
        
        await waitFor(() => {
            expect(screen.getByText('Currículo Pronto!')).toBeInTheDocument();
        });
        
        jest.useRealTimers();
    });
});
