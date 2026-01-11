import { render, screen } from '@testing-library/react';
import { TraditionalTemplate } from '../../../src/components/ResumeTemplates/TraditionalTemplate';
import { ResumeData } from '../../../src/business/domain/models/curriculum.model';
import '@testing-library/jest-dom';

const mockData: ResumeData = {
    personalInfo: {
        fullName: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Main St',
        linkedin: 'linkedin.com/in/johndoe',
        website: 'johndoe.com'
    },
    summary: 'Experienced developer',
    experience: [
        {
            company: 'Tech Corp',
            position: 'Senior Developer',
            startDate: '2020-01',
            endDate: '2023-01',
            description: 'Led development team'
        }
    ],
    education: [
        {
            institution: 'University',
            degree: 'Bachelor',
            fieldOfStudy: 'Computer Science',
            graduationDate: '2019-12'
        }
    ],
    schooling: [],
    courses: [
        {
            name: 'React Course',
            institution: 'Udemy',
            duration: '40h'
        }
    ],
    selectedTemplate: 4
};

describe('TraditionalTemplate', () => {
    it('renders personal info correctly', () => {
        render(<TraditionalTemplate data={mockData} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText(/john@example.com/)).toBeInTheDocument();
        expect(screen.getByText(/1234567890/)).toBeInTheDocument();
        expect(screen.getByText(/123 Main St/)).toBeInTheDocument();
    });

    it('renders summary correctly', () => {
        render(<TraditionalTemplate data={mockData} />);
        expect(screen.getByText('Experienced developer')).toBeInTheDocument();
    });

    it('renders experience correctly', () => {
        render(<TraditionalTemplate data={mockData} />);
        
        expect(screen.getByText('Tech Corp')).toBeInTheDocument();
        expect(screen.getByText('Senior Developer')).toBeInTheDocument();
        expect(screen.getByText('Led development team')).toBeInTheDocument();
    });

    it('renders education correctly', () => {
        render(<TraditionalTemplate data={mockData} />);
        
        expect(screen.getByText('University')).toBeInTheDocument();
        expect(screen.getByText(/Bachelor/)).toBeInTheDocument();
    });

    it('renders courses correctly', () => {
        render(<TraditionalTemplate data={mockData} />);
        
        expect(screen.getByText('React Course')).toBeInTheDocument();
    });
});
