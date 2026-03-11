import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
});

export const registerSchema = z.object({
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

export type LoginScreenComponentProps = {
    controller: {
        actions: {
            setMode: (mode: LoginMode) => void;
            handleLogin: (email: string, password: string) => Promise<void>;
            handleRegister: (email: string, password: string) => Promise<void>;
            handleGoogleLogin: () => Promise<void>;
            goBack: () => void;
        };
        states: {
            mode: LoginMode;
            isLoading: boolean;
            error: string | null;
        };
    };
};
