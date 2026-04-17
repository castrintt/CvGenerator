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
    addJobApplication: (sectionId: string, data: Omit<JobApplication, 'id' | 'sectionId'>) => JobApplication;
    updateJobApplication: (id: string, data: Partial<JobApplication>) => void;
    moveJobApplication: (id: string, newSectionId: string) => void;
    moveAllFromSection: (fromSectionId: string, toSectionId: string) => void;
    removeJobApplication: (id: string) => void;
    removeAllFromSection: (sectionId: string) => void;
    getBySection: (sectionId: string) => JobApplication[];
}

const JobApplicationsContext = createContext<JobApplicationsContextType | undefined>(undefined);

const categoryService = container.get<ICategoryService>(CategorySymbols.CategoryService);
const jobService = container.get<IJobService>(JobSymbols.JobService);

const generateId = () => `job-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

export const JobApplicationsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);
    const userId = useSelector(selectUserId);

    useEffect(() => {
        if (!userId) {
            setJobApplications([]);
            return;
        }

        categoryService
            .findAllCategories(userId)
            .then(({ jobApplications: fetched }) => {
                setJobApplications(fetched);
            })
            .catch(() => setJobApplications([]));
    }, [userId]);

    const addJobApplication = useCallback(
        (sectionId: string, data: Omit<JobApplication, 'id' | 'sectionId'>): JobApplication => {
            const newItem: JobApplication = {
                ...data,
                id: generateId(),
                sectionId,
            };
            setJobApplications((prev) => [...prev, newItem]);

            jobService
                .createJob({
                    enterpriseName: data.company,
                    jobTitle: data.position,
                    candidatedAt: data.appliedDate,
                    jobLink: data.link ?? '',
                    observation: data.notes ?? '',
                    categoryId: sectionId,
                })
                .catch(() => {
                    setJobApplications((prev) => prev.filter((j) => j.id !== newItem.id));
                });

            return newItem;
        },
        [],
    );

    const updateJobApplication = useCallback(
        (id: string, data: Partial<JobApplication>) => {
            setJobApplications((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...data } : item)),
            );

            const current = jobApplications.find((j) => j.id === id);
            if (current) {
                const merged = { ...current, ...data };
                jobService
                    .updateJob({
                        id,
                        enterpriseName: merged.company,
                        jobTitle: merged.position,
                        candidatedAt: merged.appliedDate,
                        jobLink: merged.link ?? '',
                        observation: merged.notes ?? '',
                    })
                    .catch(() => {
                        setJobApplications((prev) =>
                            prev.map((item) => (item.id === id ? current : item)),
                        );
                    });
            }
        },
        [jobApplications],
    );

    const moveJobApplication = useCallback((id: string, newSectionId: string) => {
        setJobApplications((prev) =>
            prev.map((item) => (item.id === id ? { ...item, sectionId: newSectionId } : item)),
        );

        jobService
            .switchJobCategory({ id, categoryId: newSectionId })
            .catch(() => { /* optimistic — silently ignore */ });
    }, []);

    const moveAllFromSection = useCallback((fromSectionId: string, toSectionId: string) => {
        setJobApplications((prev) =>
            prev.map((item) =>
                item.sectionId === fromSectionId ? { ...item, sectionId: toSectionId } : item,
            ),
        );

        const toMove = jobApplications.filter((j) => j.sectionId === fromSectionId);
        toMove.forEach((job) => {
            jobService.switchJobCategory({ id: job.id, categoryId: toSectionId }).catch(() => { });
        });
    }, [jobApplications]);

    const removeJobApplication = useCallback((id: string) => {
        setJobApplications((prev) => prev.filter((item) => item.id !== id));
        jobService.deleteJob(id).catch(() => { /* optimistic */ });
    }, []);

    const removeAllFromSection = useCallback((sectionId: string) => {
        const toRemove = jobApplications.filter((j) => j.sectionId === sectionId);
        setJobApplications((prev) => prev.filter((item) => item.sectionId !== sectionId));
        toRemove.forEach((job) => {
            jobService.deleteJob(job.id).catch(() => { });
        });
    }, [jobApplications]);

    const getBySection = useCallback(
        (sectionId: string) => jobApplications.filter((item) => item.sectionId === sectionId),
        [jobApplications],
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
