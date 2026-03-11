import React, {createContext, ReactNode, useContext, useState, useEffect, useCallback} from 'react';
import type {JobApplication} from '../../business/domain/models/jobApplication.model';

const STORAGE_KEY = 'cvgenerator_job_applications';

function migrateFromLegacy(data: unknown): JobApplication[] {
    if (!Array.isArray(data)) return [];
    const sectionMap: Record<string, string> = {
        vagas_candidatadas: 'applied',
        em_processo: 'in_progress',
        devolutivas_positivas: 'positive_feedback',
        negadas: 'rejected',
        vagas_frias: 'applied',
        cold: 'applied',
    };
    return data.map((item: Record<string, unknown>) => {
        const legacySection = item.sectionId as string;
        const sectionId = sectionMap[legacySection] ?? legacySection;
        return {
            id: String(item.id ?? ''),
            company: String(item.company ?? item.empresa ?? ''),
            position: String(item.position ?? item.cargo ?? ''),
            appliedDate: String(item.appliedDate ?? item.dataCandidatura ?? ''),
            link: item.link ? String(item.link) : undefined,
            notes: item.notes ?? item.observacoes ? String(item.notes ?? item.observacoes) : undefined,
            sectionId,
        };
    });
}

interface JobApplicationsContextType {
    jobApplications: JobApplication[];
    addJobApplication: (sectionId: string, data: Omit<JobApplication, 'id' | 'sectionId'>) => JobApplication;
    updateJobApplication: (id: string, data: Partial<JobApplication>) => void;
    moveJobApplication: (id: string, newSectionId: string) => void;
    moveAllFromSection: (fromSectionId: string, toSectionId: string) => void;
    removeJobApplication: (id: string) => void;
    removeAllFromSection: (sectionId: string) => void;
    getBySection: (sectionId: string) => JobApplication[];
}

const JobApplicationsContext = createContext<JobApplicationsContextType | undefined>(undefined);

const generateId = () => `job-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const JobApplicationsProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (!stored) {
            const legacyStored = localStorage.getItem('cvgenerator_candidaturas');
            if (legacyStored) {
                try {
                    const parsed = JSON.parse(legacyStored);
                    const migrated = migrateFromLegacy(parsed);
                    setJobApplications(migrated);
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
                    localStorage.removeItem('cvgenerator_candidaturas');
                } catch {
                    localStorage.removeItem('cvgenerator_candidaturas');
                }
            }
            return;
        }
        try {
            const parsed = JSON.parse(stored);
            const items = Array.isArray(parsed) ? parsed : [];
            const migrated = items.map((item: JobApplication) =>
                item.sectionId === 'cold' ? {...item, sectionId: 'applied'} : item
            );
            if (migrated.some((item: JobApplication, i: number) => item.sectionId !== items[i]?.sectionId)) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
            }
            setJobApplications(migrated);
        } catch {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(jobApplications));
    }, [jobApplications]);

    const addJobApplication = useCallback(
        (sectionId: string, data: Omit<JobApplication, 'id' | 'sectionId'>) => {
            const newItem: JobApplication = {
                ...data,
                id: generateId(),
                sectionId,
            };
            setJobApplications((prev) => [...prev, newItem]);
            return newItem;
        },
        []
    );

    const updateJobApplication = useCallback((id: string, data: Partial<JobApplication>) => {
        setJobApplications((prev) =>
            prev.map((item) => (item.id === id ? {...item, ...data} : item))
        );
    }, []);

    const moveJobApplication = useCallback((id: string, newSectionId: string) => {
        setJobApplications((prev) =>
            prev.map((item) => (item.id === id ? {...item, sectionId: newSectionId} : item))
        );
    }, []);

    const moveAllFromSection = useCallback((fromSectionId: string, toSectionId: string) => {
        setJobApplications((prev) =>
            prev.map((item) =>
                item.sectionId === fromSectionId ? {...item, sectionId: toSectionId} : item
            )
        );
    }, []);

    const removeJobApplication = useCallback((id: string) => {
        setJobApplications((prev) => prev.filter((item) => item.id !== id));
    }, []);

    const removeAllFromSection = useCallback((sectionId: string) => {
        setJobApplications((prev) => prev.filter((item) => item.sectionId !== sectionId));
    }, []);

    const getBySection = useCallback(
        (sectionId: string) =>
            jobApplications.filter((item) => item.sectionId === sectionId),
        [jobApplications]
    );

    return (
        <JobApplicationsContext.Provider
            value={{
                jobApplications,
                addJobApplication,
                updateJobApplication,
                moveJobApplication,
                moveAllFromSection,
                removeJobApplication,
                removeAllFromSection,
                getBySection,
            }}
        >
            {children}
        </JobApplicationsContext.Provider>
    );
};

export const useJobApplications = () => {
    const context = useContext(JobApplicationsContext);
    if (!context) {
        throw new Error('useJobApplications must be used within a JobApplicationsProvider');
    }
    return context;
};
