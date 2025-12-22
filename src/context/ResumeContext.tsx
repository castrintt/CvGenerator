import React, {createContext, ReactNode, useContext, useState} from 'react';
import type {ResumeData} from "../../business/domain/models/curriculum.model.ts";

interface ResumeContextType {
    resumeData: ResumeData | null;
    setResumeData: (data: ResumeData) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [resumeData, setResumeData] = useState<ResumeData | null>(null);

    return (
        <ResumeContext.Provider value={{resumeData, setResumeData}}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (!context) {
        throw new Error('useResumeContext must be used within a ResumeProvider');
    }
    return context;
};