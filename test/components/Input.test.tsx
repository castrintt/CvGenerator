import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../src/components/Input/Input';
import '@testing-library/jest-dom';

describe('Input Component', () => {
    it('renders correctly', () => {
        render(<Input placeholder="Enter text" />);
        const input = screen.getByPlaceholderText('Enter text');
        expect(input).toBeInTheDocument();
    });

    it('renders with label', () => {
        render(<Input label="Username" />);
        const label = screen.getByText('Username');
        expect(label).toBeInTheDocument();
    });

    it('renders with error message', () => {
        render(<Input error="Invalid input" />);
        const errorMessage = screen.getByText('Invalid input');
        expect(errorMessage).toBeInTheDocument();
    });

    it('handles change events', () => {
        const handleChange = jest.fn();
        render(<Input onChange={handleChange} />);
        const input = screen.getByRole('textbox');
        fireEvent.change(input, { target: { value: 'test' } });
        expect(handleChange).toHaveBeenCalledTimes(1);
    });
});
