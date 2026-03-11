import React, {createContext, ReactNode, useContext, useState, useEffect} from 'react';

export interface User {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    loginWithEmail: (email: string, password: string) => Promise<void>;
    registerWithEmail: (email: string, password: string) => Promise<void>;
    loginWithGoogle: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'cvgenerator_auth_user';

export const AuthProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                setUser(parsed);
            } catch {
                localStorage.removeItem(STORAGE_KEY);
            }
        }
        setIsLoading(false);
    }, []);

    const persistUser = (u: User | null) => {
        setUser(u);
        if (u) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    };

    const loginWithEmail = async (email: string, _password: string) => {
        setIsLoading(true);
        try {
            const u: User = {
                id: `local-${Date.now()}`,
                email,
                displayName: email.split('@')[0],
            };
            persistUser(u);
        } finally {
            setIsLoading(false);
        }
    };

    const registerWithEmail = async (email: string, _password: string) => {
        setIsLoading(true);
        try {
            const u: User = {
                id: `local-${Date.now()}`,
                email,
                displayName: email.split('@')[0],
            };
            persistUser(u);
        } finally {
            setIsLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setIsLoading(true);
        try {
            const u: User = {
                id: `google-${Date.now()}`,
                email: 'usuario@gmail.com',
                displayName: 'Usuário Google',
                photoURL: undefined,
            };
            persistUser(u);
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
                loginWithGoogle,
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
