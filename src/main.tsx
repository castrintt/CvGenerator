import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import {JobApplicationsProvider} from "./context/JobApplicationsContext.tsx";
import {SectionsProvider} from "./context/SectionsContext.tsx";
import {ResumeProvider} from "./context/ResumeContext.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
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
    </React.StrictMode>,
)