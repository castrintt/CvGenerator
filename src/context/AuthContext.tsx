import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { container } from '../../business/ioc/ioc.config';
import { AuthenticationSymbols } from '../../business/ioc/symbols/authentication.symbols';
import type { IAuthenticationService } from '../../business/domain/interfaces/i-authentication.service';
import { setUser, clearUser } from '../store/auth.slice';

export interface User {
    id: string;
    email: string;
    name?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    registerWithEmail: (name: string, email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'cvgenerator_auth_user';

const authService = container.get<IAuthenticationService>(
    AuthenticationSymbols.AuthenticationService,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setLocalUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored) as User;
                setLocalUser(parsed);
                dispatch(setUser({ id: parsed.id, name: parsed.name ?? '', email: parsed.email }));
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, [dispatch]);

    const persistUser = (u: User | null) => {
        setLocalUser(u);
        if (u) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
            dispatch(setUser({ id: u.id, name: u.name ?? '', email: u.email }));
        } else {
            localStorage.removeItem(STORAGE_KEY);
            dispatch(clearUser());
        }
    };

    const loginWithEmail = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const dto = await authService.loginWithCredentials({ email, password });
            persistUser({ id: dto.id, email: dto.email, name: dto.name });
        } finally {
            setIsLoading(false);
        }
    };

    const registerWithEmail = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            await authService.registerWithCredentials({ name, email, password });
            const dto = await authService.loginWithCredentials({ email, password });
            persistUser({ id: dto.id, email: dto.email, name: dto.name });
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        persistUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                loginWithEmail,
                registerWithEmail,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
