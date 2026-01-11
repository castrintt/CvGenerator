import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { FeedbackScreen } from '../../src/screens/FeedbackScreen/FeedbackScreen';
import { ResumeProvider, useResumeContext } from '../../src/context/ResumeContext';
import { ThemeProvider } from '../../src/context/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { ResumeData } from '../../business/domain/models/curriculum.model';
import '@testing-library/jest-dom';

// Mock ResumeService
jest.mock('../../src/business/service/Resume.service.ts', () => {
    return {
        ResumeService: jest.fn().mockImplementation(() => ({
            generatePDF: jest.fn(),
            generateImage: jest.fn(),
        }))
    };
});

// Mock emailjs
jest.mock('@emailjs/browser', () => ({
    send: jest.fn().mockResolvedValue({ status: 200, text: 'OK' }),
}));

// Helper component to set resume data
const ResumeDataSetter = ({ children }: { children: React.ReactNode }) => {
    const { setResumeData } = useResumeContext();
    React.useEffect(() => {
        setResumeData({
            personalInfo: { fullName: 'Test User', email: 'test@test.com', phone: '1234567890', address: 'Test Address' },
            summary: 'Test Summary',
            experience: [],
            education: [],
            skills: [],
            selectedTemplate: 1
        } as ResumeData);
    }, [setResumeData]);
    return <>{children}</>;
};

const renderFeedbackScreenWithData = () => {
    return render(
        <BrowserRouter>
            <ThemeProvider>
                <ResumeProvider>
                    <ResumeDataSetter>
                        <FeedbackScreen />
                    </ResumeDataSetter>
                </ResumeProvider>
            </ThemeProvider>
        </BrowserRouter>
    );
};

describe('FeedbackScreen', () => {
    it('renders feedback form', () => {
        renderFeedbackScreenWithData();
        
        expect(screen.getByText('Feedback')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('O que você gostou? O que podemos melhorar?')).toBeInTheDocument();
        expect(screen.getByText('Enviar Feedback')).toBeInTheDocument();
    });

    it('submits feedback and shows download options', async () => {
        renderFeedbackScreenWithData();
        
        const textarea = screen.getByPlaceholderText('O que você gostou? O que podemos melhorar?');
        fireEvent.change(textarea, { target: { value: 'Great app! Very useful.' } });
        
        const submitButton = screen.getByText('Enviar Feedback');
        fireEvent.click(submitButton);
        
        await waitFor(() => {
            expect(screen.getByText('Baixar Currículo')).toBeInTheDocument();
            expect(screen.getByText('Baixar como PDF')).toBeInTheDocument();
        });
    });
});
