import {z} from 'zod';
import type {BaseSyntheticEvent} from 'react';
import type {UseFormReturn} from 'react-hook-form';
import {INPUT_LIMITS} from '../../../business/shared/validation/limits';

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email('E-mail inválido')
        .max(INPUT_LIMITS.email, `Máximo de ${INPUT_LIMITS.email} caracteres`),
    password: z
        .string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres')
        .max(INPUT_LIMITS.password, `Máximo de ${INPUT_LIMITS.password} caracteres`),
});

export const registerSchema = z
    .object({
        name: z
            .string()
            .trim()
            .min(2, 'Nome deve ter no mínimo 2 caracteres')
            .max(INPUT_LIMITS.personName, `Máximo de ${INPUT_LIMITS.personName} caracteres`),
        email: z
            .string()
            .trim()
            .email('E-mail inválido')
            .max(INPUT_LIMITS.email, `Máximo de ${INPUT_LIMITS.email} caracteres`),
        password: z
            .string()
            .min(6, 'Senha deve ter no mínimo 6 caracteres')
            .max(INPUT_LIMITS.password, `Máximo de ${INPUT_LIMITS.password} caracteres`),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
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
