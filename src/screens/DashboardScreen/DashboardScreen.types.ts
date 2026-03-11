import type {JobApplication} from '../../../business/domain/models/jobApplication.model';
import type {Section} from '../../../business/domain/models/section.model';

export type DashboardScreenComponentProps = {
    controller: {
        actions: {
            addJobApplication: (sectionId: string) => JobApplication;
            updateJobApplication: (id: string, data: Partial<JobApplication>) => void;
            removeJobApplication: (id: string) => void;
            moveJobApplication: (id: string, newSectionId: string) => void;
            handleDragEnd: (activeId: string, overId: string | null) => void;
            logout: () => void;
            addSection: (name: string) => Section;
            updateSection: (id: string, data: Partial<Pick<Section, 'name' | 'colorKey'>>) => void;
            removeSection: (id: string) => void;
            reorderSections: (fromIndex: number, toIndex: number) => void;
        };
        states: {
            sections: Section[];
            jobApplicationsBySection: Record<string, JobApplication[]>;
            userEmail: string;
        };
    };
};
