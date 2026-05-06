import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
    isPending?: boolean;
    /** Quando true e `isPending`, exibe `pendingLabel` no lugar dos filhos. */
    pendingShowsLabel?: boolean;
    pendingLabel?: string;
}