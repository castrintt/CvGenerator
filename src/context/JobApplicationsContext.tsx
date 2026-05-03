import React, { createContext, ReactNode, useContext, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { container } from '../../business/ioc/ioc.config';
import { CategorySymbols } from '../../business/ioc/symbols/category.symbols';
import { JobSymbols } from '../../business/ioc/symbols/job.symbols';
import type { ICategoryService } from '../../business/domain/interfaces/i-category.service';
import type { IJobService } from '../../business/domain/interfaces/i-job.service';
import type { JobApplication } from '../../business/domain/models/jobApplication.model';
import { selectUserId } from '../store/auth.slice';

interface JobApplicationsContextType {
    jobApplications: JobApplication[];
    refreshJobApplicationsFromBackend: () => Promise<void>;
    addJobApplication: (sectionId: string, data: Omit<JobApplication, 'id' | 'sectionId'>) => Promise<void>;
    updateJobApplication: (id: string, data: Partial<JobApplication>) => Promise<void>;
    moveJobApplication: (id: string, newSectionId: string) => void;
    moveAllFromSection: (fromSectionId: string, toSectionId: string) => void;
    removeJobApplication: (id: string) => Promise<void>;
    removeAllFromSection: (sectionId: string) => Promise<void>;
    getBySection: (sectionId: string) => JobApplication[];
}

const JobApplicationsContext = createContext<JobApplicationsContextType | undefined>(undefined);

const categoryService = container.get<ICategoryService>(CategorySymbols.CategoryService);
const jobService = container.get<IJobService>(JobSymbols.JobService);

export const JobApplicationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const userId = useSelector(selectUserId);

    const refreshJobApplicationsFromBackend = useCallback(async () => {
        if (!userId) return;
        const { jobApplications: fetched } = await categoryService.findAllCategories(userId);
        setJobApplications(fetched);
    }, [userId]);

    useEffect(() => {
        if (!userId) {
            setJobApplications([]);
            return;
        }
        refreshJobApplicationsFromBackend().catch(() => setJobApplications([]));
    }, [userId, refreshJobApplicationsFromBackend]);

    const addJobApplication = useCallback(
        async (sectionId: string, data: Omit<JobApplication, 'id' | 'sectionId'>): Promise<void> => {
            await jobService.createJob({
                enterpriseName: data.company,
                jobTitle: data.position,
                candidatedAt: data.appliedDate,
                jobLink: data.link ?? '',
                observation: data.notes ?? '',
                categoryId: sectionId,
            });
            await refreshJobApplicationsFromBackend();
        },
        [refreshJobApplicationsFromBackend],
    );

    const updateJobApplication = useCallback(
        async (id: string, data: Partial<JobApplication>): Promise<void> => {
            const current = jobApplications.find((j) => j.id === id);
            if (!current) return;
            const merged = { ...current, ...data };
            await jobService.updateJob({
                id,
                enterpriseName: merged.company,
                jobTitle: merged.position,
                candidatedAt: merged.appliedDate,
                jobLink: merged.link ?? '',
                observation: merged.notes ?? '',
            });
            await refreshJobApplicationsFromBackend();
        },
        [jobApplications, refreshJobApplicationsFromBackend],
    );

    const moveJobApplication = useCallback(
        (id: string, newSectionId: string) => {
            setJobApplications((prev) =>
                prev.map((item) => (item.id === id ? { ...item, sectionId: newSectionId } : item)),
            );
            jobService
                .switchJobCategory({ id, categoryId: newSectionId })
                .then(() => refreshJobApplicationsFromBackend())
                .catch(() => refreshJobApplicationsFromBackend());
        },
        [refreshJobApplicationsFromBackend],
    );

    const moveAllFromSection = useCallback(
        (fromSectionId: string, toSectionId: string) => {
            setJobApplications((prev) =>
                prev.map((item) =>
                    item.sectionId === fromSectionId ? { ...item, sectionId: toSectionId } : item,
                ),
            );
            const toMove = jobApplications.filter((j) => j.sectionId === fromSectionId);
            Promise.all(
                toMove.map((job) => jobService.switchJobCategory({ id: job.id, categoryId: toSectionId })),
            )
                .then(() => refreshJobApplicationsFromBackend())
                .catch(() => refreshJobApplicationsFromBackend());
        },
        [jobApplications, refreshJobApplicationsFromBackend],
    );

    const removeJobApplication = useCallback(
        async (id: string): Promise<void> => {
            await jobService.deleteJob(id);
            await refreshJobApplicationsFromBackend();
        },
        [refreshJobApplicationsFromBackend],
    );

    const removeAllFromSection = useCallback(
        async (sectionId: string): Promise<void> => {
            const toRemove = jobApplications.filter((j) => j.sectionId === sectionId);
            await Promise.all(toRemove.map((job) => jobService.deleteJob(job.id)));
            await refreshJobApplicationsFromBackend();
        },
        [jobApplications, refreshJobApplicationsFromBackend],
    );

    const getBySection = useCallback(
        (sectionId: string) => jobApplications.filter((item) => item.sectionId === sectionId),
        [jobApplications],
    );

    return (
        <JobApplicationsContext.Provider
            value={{
                jobApplications,
                refreshJobApplicationsFromBackend,
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
