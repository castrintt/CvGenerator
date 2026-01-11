import React from 'react';
import { render, screen } from '@testing-library/react';
import { Button } from '../../src/components/Button/Button';
import '@testing-library/jest-dom';

describe('Button Component', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>);
        const button = screen.getByText('Click me');
        expect(button).toBeInTheDocument();
    });

    it('renders with primary variant', () => {
        render(<Button variant="primary">Primary</Button>);
        const button = screen.getByText('Primary');
        expect(button).toBeInTheDocument();
    });

    it('renders with secondary variant', () => {
        render(<Button variant="secondary">Secondary</Button>);
        const button = screen.getByText('Secondary');
        expect(button).toBeInTheDocument();
    });

    it('renders with outline variant', () => {
        render(<Button variant="outline">Outline</Button>);
        const button = screen.getByText('Outline');
        expect(button).toBeInTheDocument();
    });

    it('renders full width', () => {
        render(<Button fullWidth>Full Width</Button>);
        const button = screen.getByText('Full Width');
        expect(button).toBeInTheDocument();
    });
});
