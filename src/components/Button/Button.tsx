import React from 'react';
import {StyledButton} from "./Button.styles.tsx";
import type {ButtonProps} from "./Button.types.ts";

export const Button: React.FC<ButtonProps> = ({variant = 'primary', fullWidth = false, ...props}) => {
    return <StyledButton $variant={variant} $fullWidth={fullWidth} {...props} />;
};