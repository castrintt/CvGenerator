import type {JobApplication, JobApplicationSectionId} from '../../../business/domain/models/jobApplication.model';

export type DashboardScreenComponentProps = {
    controller: {
        actions: {
            addJobApplication: (sectionId: JobApplicationSectionId) => JobApplication;
            updateJobApplication: (id: string, data: Partial<JobApplication>) => void;
            removeJobApplication: (id: string) => void;
            moveJobApplication: (id: string, newSectionId: JobApplicationSectionId) => void;
            handleDragEnd: (activeId: string, overId: string | null) => void;
            logout: () => void;
        };
        states: {
            jobApplicationsBySection: Record<JobApplicationSectionId, JobApplication[]>;
            userEmail: string;
        };
    };
};
