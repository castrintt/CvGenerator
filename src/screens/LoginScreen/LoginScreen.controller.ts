import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';
import {loginSchema, registerSchema} from './LoginScreen.types';
import type {LoginFormData, LoginMode, RegisterFormData} from './LoginScreen.types';

export type {LoginMode};

export const UseLoginScreenController = () => {
    const navigate = useNavigate();
    const {loginWithEmail, registerWithEmail} = useAuth();
    const [mode, setMode] = useState<LoginMode>('choice');
    const [isLoading, setIsLoading] = useState(false);

    const loginForm = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: '', password: ''},
    });

    const registerForm = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {name: '', email: '', password: '', confirmPassword: ''},
    });

    const goBack = () => navigate('/');

    const handleLogin = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            await loginWithEmail(email, password);
            navigate('/dashboard');
        } catch {
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            await registerWithEmail(name, email, password);
            navigate('/dashboard');
        } catch {
        } finally {
            setIsLoading(false);
        }
    };

    const submitLogin = loginForm.handleSubmit((data) =>
        handleLogin(data.email, data.password),
    );
    const submitRegister = registerForm.handleSubmit((data) =>
        handleRegister(data.name, data.email, data.password),
    );

    return {
        actions: {
            setMode,
            goBack,
            submitLogin,
            submitRegister,
        },
        states: {
            mode,
            isLoading,
            loginForm,
            registerForm,
        },
    };
};
