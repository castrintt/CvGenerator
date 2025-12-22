import {forwardRef} from 'react';
import {Container, ErrorMessage, Label, StyledInput} from "./Input.styles.tsx";
import type {InputProps} from "./Input.types.ts";


export const Input = forwardRef<HTMLInputElement, InputProps>(({label, error, ...props}, ref) => {
    return (
        <Container>
            {label && <Label>{label}</Label>}
            <StyledInput ref={ref} $hasError={!!error} {...props} />
            {error && <ErrorMessage>{error}</ErrorMessage>}
        </Container>
    );
});

Input.displayName = 'Input';