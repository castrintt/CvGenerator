import 'reflect-metadata';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.tsx';
import { JobApplicationsProvider } from './context/JobApplicationsContext.tsx';
import { SectionsProvider } from './context/SectionsContext.tsx';
import { ResumeProvider } from './context/ResumeContext.tsx';
import { GlobalApiLoadingBar } from './components/GlobalApiLoading/GlobalApiLoading.tsx';
import { ThemeProvider } from './context/ThemeContext.tsx';
import { store } from './store/store.ts';
import { clearUser } from './store/auth.slice.ts';
import { AppConfig } from '../business/shared/config/app.config.ts';

AppConfig.onSessionExpired = () => store.dispatch(clearUser());

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider>
                <GlobalApiLoadingBar />
                <AuthProvider>
                    <SectionsProvider>
                        <JobApplicationsProvider>
                            <ResumeProvider>
                                <App/>
                            </ResumeProvider>
                        </JobApplicationsProvider>
                    </SectionsProvider>
                </AuthProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
);
