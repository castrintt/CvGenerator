import React from 'react';
import { render, screen } from '@testing-library/react';
import { ModernSidebarTemplate } from '../../../src/components/ResumeTemplates/ModernSidebarTemplate';
import { ResumeData } from '../../../business/domain/models/curriculum.model';
import '@testing-library/jest-dom';

const mockData: ResumeData = {
    personalInfo: {
        fullName: 'Jane Doe',
        email: 'jane@example.com',
        phone: '9876543210',
        address: '456 Side St',
        linkedin: 'linkedin.com/in/janedoe',
        website: 'janedoe.com'
    },
    summary: 'Creative designer',
    experience: [
        {
            company: 'Design Studio',
            position: 'Lead Designer',
            startDate: '06/2018',
            endDate: 'Present',
            description: 'Created amazing designs'
        }
    ],
    education: [
        {
            institution: 'Art School',
            degree: 'Master',
            fieldOfStudy: 'Graphic Design',
            graduationDate: '05/2018'
        }
    ],
    skills: [
        {
            name: 'Photoshop',
            level: 'Especialista'
        }
    ],
    selectedTemplate: 2
};

describe('ModernSidebarTemplate', () => {
    it('renders personal info in sidebar', () => {
        render(<ModernSidebarTemplate data={mockData} />);
        
        expect(screen.getByText('Jane Doe')).toBeInTheDocument();
        expect(screen.getByText('jane@example.com')).toBeInTheDocument();
        expect(screen.getByText('9876543210')).toBeInTheDocument();
        expect(screen.getByText('456 Side St')).toBeInTheDocument();
    });

    it('renders summary in main section', () => {
        render(<ModernSidebarTemplate data={mockData} />);
        expect(screen.getByText('Creative designer')).toBeInTheDocument();
    });

    it('renders experience correctly', () => {
        render(<ModernSidebarTemplate data={mockData} />);
        
        expect(screen.getByText('Design Studio')).toBeInTheDocument();
        expect(screen.getByText('Lead Designer')).toBeInTheDocument();
        expect(screen.getByText('Created amazing designs')).toBeInTheDocument();
    });

    it('renders education correctly', () => {
        render(<ModernSidebarTemplate data={mockData} />);
        
        expect(screen.getByText('Art School')).toBeInTheDocument();
        expect(screen.getByText(/Master/)).toBeInTheDocument();
        expect(screen.getByText(/Graphic Design/)).toBeInTheDocument();
    });

    it('renders skills with progress bars', () => {
        render(<ModernSidebarTemplate data={mockData} />);
        
        expect(screen.getByText('Photoshop')).toBeInTheDocument();
        // We can't easily test the width of the progress bar without checking styles directly
        // but we can ensure the skill name is present
    });
});
