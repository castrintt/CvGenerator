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
    logout: () => Promise<void>;
    updateUser: (data: Pick<User, 'name' | 'email'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const authService = container.get<IAuthenticationService>(
    AuthenticationSymbols.AuthenticationService,
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setLocalUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        authService
            .fetchAuthenticatedUser()
            .then((dto) => {
                syncUserState({ id: dto.id, email: dto.email, name: dto.name });
            })
            .catch(() => {
                setLocalUser(null);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    const syncUserState = (authenticatedUser: User | null) => {
        setLocalUser(authenticatedUser);
        if (authenticatedUser) {
            dispatch(setUser({ id: authenticatedUser.id, name: authenticatedUser.name ?? '', email: authenticatedUser.email }));
        } else {
            dispatch(clearUser());
        }
    };

    const loginWithEmail = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const dto = await authService.loginWithCredentials({ email, password });
            syncUserState({ id: dto.id, email: dto.email, name: dto.name });
        } finally {
            setIsLoading(false);
        }
    };

    const registerWithEmail = async (name: string, email: string, password: string) => {
        setIsLoading(true);
        try {
            await authService.registerWithCredentials({ name, email, password });
            const dto = await authService.loginWithCredentials({ email, password });
            syncUserState({ id: dto.id, email: dto.email, name: dto.name });
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
        } finally {
            syncUserState(null);
        }
    };

    const updateUser = (data: Pick<User, 'name' | 'email'>) => {
        if (!user) return;
        syncUserState({ ...user, ...data });
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                loginWithEmail,
                registerWithEmail,
                logout,
                updateUser,
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
