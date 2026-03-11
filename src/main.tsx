import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {AuthProvider} from "./context/AuthContext.tsx";
import {JobApplicationsProvider} from "./context/JobApplicationsContext.tsx";
import {ResumeProvider} from "./context/ResumeContext.tsx";
import {ThemeProvider} from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <AuthProvider>
                <JobApplicationsProvider>
                    <ResumeProvider>
                        <App/>
                    </ResumeProvider>
                </JobApplicationsProvider>
            </AuthProvider>
        </ThemeProvider>
    </React.StrictMode>,
)