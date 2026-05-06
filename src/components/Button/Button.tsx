import React from 'react';
import {StyledButton} from "./Button.styles.tsx";
import type {ButtonProps} from "./Button.types.ts";

const DEFAULT_PENDING_LABEL = 'Carregando...';

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    fullWidth = false,
    isPending = false,
    pendingShowsLabel = false,
    pendingLabel = DEFAULT_PENDING_LABEL,
    disabled,
    children,
    ...rest
}) => {
    const isDisabled = Boolean(disabled || isPending);
    const label = isPending && pendingShowsLabel ? pendingLabel : children;

    return (
        <StyledButton
            $variant={variant}
            $fullWidth={fullWidth}
            disabled={isDisabled}
            aria-busy={isPending ? true : undefined}
            {...rest}
        >
            {label}
        </StyledButton>
    );
};