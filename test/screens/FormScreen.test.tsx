import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FormScreen } from '../../src/screens/FormScreen/FormScreen';
import { ResumeProvider } from '../../src/context/ResumeContext';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock scrollIntoView
window.HTMLElement.prototype.scrollIntoView = jest.fn();

const renderFormScreen = () => {
    return render(
        <BrowserRouter>
            <ThemeProvider>
                <ResumeProvider>
                    <FormScreen />
                </ResumeProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

describe('FormScreen', () => {
    it('renders all form sections', () => {
        renderFormScreen();
        
        expect(screen.getByText('Informações Pessoais')).toBeInTheDocument();
        expect(screen.getByText('Resumo Profissional')).toBeInTheDocument();
        expect(screen.getByText('Experiência Profissional')).toBeInTheDocument();
        expect(screen.getByText('Formação Acadêmica')).toBeInTheDocument();
        expect(screen.getByText('Habilidades')).toBeInTheDocument();
        expect(screen.getByText('Escolha seu Modelo')).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        renderFormScreen();
        
        const submitButton = screen.getByText('Gerar Currículo');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Nome completo é obrigatório')).toBeInTheDocument();
            expect(screen.getByText('Endereço de e-mail inválido')).toBeInTheDocument();
            expect(screen.getByText('O resumo deve ter pelo menos 20 caracteres')).toBeInTheDocument();
        });
    });

    it('adds and removes experience fields', () => {
        renderFormScreen();
        
        const addButton = screen.getByText('+ Adicionar Experiência');
        fireEvent.click(addButton);
        
        const removeButtons = screen.getAllByText('Remover');
        expect(removeButtons.length).toBeGreaterThan(0);
        
        fireEvent.click(removeButtons[0]);
    });
});
