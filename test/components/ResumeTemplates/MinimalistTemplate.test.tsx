import { render, screen } from '@testing-library/react';
import { MinimalistTemplate } from '../../../src/components/ResumeTemplates/MinimalistTemplate';
import { ResumeData } from '../../../business/domain/models/curriculum.model';
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
            startDate: '01/2020',
            endDate: 'Present',
            description: 'Led development team'
        }
    ],
    education: [
        {
            institution: 'University',
            degree: 'Bachelor',
            fieldOfStudy: 'Computer Science',
            graduationDate: '12/2019'
        }
    ],
    skills: [
        {
            name: 'React',
            level: 'Avançado'
        }
    ],
    selectedTemplate: 3
};

describe('MinimalistTemplate', () => {
    it('renders personal info correctly', () => {
        render(<MinimalistTemplate data={mockData} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('john@example.com')).toBeInTheDocument();
        expect(screen.getByText('1234567890')).toBeInTheDocument();
        expect(screen.getByText('123 Main St')).toBeInTheDocument();
    });

    it('renders summary correctly', () => {
        render(<MinimalistTemplate data={mockData} />);
        expect(screen.getByText('Experienced developer')).toBeInTheDocument();
    });

    it('renders experience correctly', () => {
        render(<MinimalistTemplate data={mockData} />);
        
        expect(screen.getByText('Tech Corp')).toBeInTheDocument();
        expect(screen.getByText('Senior Developer')).toBeInTheDocument();
        expect(screen.getByText('Led development team')).toBeInTheDocument();
    });

    it('renders education correctly', () => {
        render(<MinimalistTemplate data={mockData} />);
        
        expect(screen.getByText('University')).toBeInTheDocument();
        expect(screen.getByText(/Bachelor/)).toBeInTheDocument();
    });

    it('renders skills correctly', () => {
        render(<MinimalistTemplate data={mockData} />);
        
        expect(screen.getByText(/React/)).toBeInTheDocument();
        expect(screen.getByText(/Avançado/)).toBeInTheDocument();
    });
});
