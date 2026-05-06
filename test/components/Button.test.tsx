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

    it('applies disabled when isPending is true', () => {
        render(<Button isPending>Submit</Button>);
        const button = screen.getByRole('button');
        expect(button).toBeDisabled();
    });

    it('shows loading label when pendingShowsLabel and isPending', () => {
        render(
            <Button isPending pendingShowsLabel>
                Salvar
            </Button>,
        );
        expect(screen.getByRole('button')).toHaveTextContent('Carregando...');
    });

    it('uses custom pendingLabel when pendingShowsLabel and isPending', () => {
        render(
            <Button isPending pendingShowsLabel pendingLabel="Aguarde">
                Salvar
            </Button>,
        );
        expect(screen.getByRole('button')).toHaveTextContent('Aguarde');
    });

    it('keeps children text when isPending without pendingShowsLabel', () => {
        render(<Button isPending>Cancelar</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveTextContent('Cancelar');
        expect(button).toBeDisabled();
    });

    it('sets aria-busy when isPending', () => {
        render(<Button isPending pendingShowsLabel>OK</Button>);
        expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
    });
});
