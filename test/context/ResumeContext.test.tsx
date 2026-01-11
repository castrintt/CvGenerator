import { render, screen, fireEvent } from '@testing-library/react';
import { ResumeProvider, useResumeContext } from '../../src/context/ResumeContext';
import { ResumeData } from '../../business/domain/models/curriculum.model';
import '@testing-library/jest-dom';

const TestComponent = () => {
    const { resumeData, setResumeData } = useResumeContext();
    
    const handleUpdate = () => {
        setResumeData({
            personalInfo: { fullName: 'Test User' }
        } as ResumeData);
    };

    return (
        <div>
            <span data-testid="resume-name">{resumeData?.personalInfo?.fullName || 'No Data'}</span>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

describe('ResumeContext', () => {
    it('provides default null value', () => {
        render(
            <ResumeProvider>
                <TestComponent />
            </ResumeProvider>
        );
        expect(screen.getByTestId('resume-name')).toHaveTextContent('No Data');
    });

    it('updates resume data', () => {
        render(
            <ResumeProvider>
                <TestComponent />
            </ResumeProvider>
        );
        
        const button = screen.getByRole('button');
        fireEvent.click(button);
        
        expect(screen.getByTestId('resume-name')).toHaveTextContent('Test User');
    });
});
