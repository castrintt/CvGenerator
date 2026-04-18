import {z} from 'zod';
import type {BaseSyntheticEvent} from 'react';
import type {UseFormReturn} from 'react-hook-form';

export const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
    name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

export type LoginMode = 'choice' | 'login' | 'register';

export type LoginScreenController = {
    actions: {
        setMode: (mode: LoginMode) => void;
        goBack: () => void;
        submitLogin: (e?: BaseSyntheticEvent) => Promise<void>;
        submitRegister: (e?: BaseSyntheticEvent) => Promise<void>;
    };
    states: {
        mode: LoginMode;
        isLoading: boolean;
        loginForm: UseFormReturn<LoginFormData>;
        registerForm: UseFormReturn<RegisterFormData>;
    };
};

export type LoginScreenComponentProps = {
    controller: LoginScreenController;
};
