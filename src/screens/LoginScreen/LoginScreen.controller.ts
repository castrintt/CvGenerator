import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

export type LoginMode = 'choice' | 'login' | 'register';

export const UseLoginScreenController = () => {
    const navigate = useNavigate();
    const {loginWithEmail, registerWithEmail, loginWithGoogle} = useAuth();
    const [mode, setMode] = useState<LoginMode>('choice');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const goBack = () => navigate('/');

    const handleLogin = async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);
        try {
            await loginWithEmail(email, password);
            navigate('/dashboard');
        } catch (e) {
            setError('Erro ao fazer login. Verifique suas credenciais.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (email: string, password: string) => {
        setError(null);
        setIsLoading(true);
        try {
            await registerWithEmail(email, password);
            navigate('/dashboard');
        } catch (e) {
            setError('Erro ao criar conta. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await loginWithGoogle();
            navigate('/dashboard');
        } catch (e) {
            setError('Erro ao conectar com Google.');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        actions: {
            setMode,
            handleLogin,
            handleRegister,
            handleGoogleLogin,
            goBack,
        },
        states: {
            mode,
            isLoading,
            error,
        },
    };
};
