import type {CollisionDetection} from '@dnd-kit/core';
import type {SensorDescriptor} from '@dnd-kit/core';
import type {UseFormReturn, SubmitHandler} from 'react-hook-form';
import type {JobApplication} from '../../../business/domain/models/jobApplication.model';
import type {Section} from '../../../business/domain/models/section.model';

export type EditModalState = {
    jobApplication: JobApplication | null;
    sectionId: string | null;
    isNew: boolean;
};

export type SectionModalState = {
    section: Section | null;
    isNew: boolean;
};

export type DeleteSectionConfirmState = {
    sectionId: string;
    sectionName: string;
    cardsCount: number;
} | null;

export type JobApplicationFormValues = {
    company: string;
    position: string;
    appliedDate: string;
    link: string;
    notes: string;
};

export type SectionFormValues = {
    name: string;
};

export type DashboardScreenBoardColumnProps = {
    section: Section;
    jobApplications: JobApplication[];
    onAdd: () => void;
    onView: (item: JobApplication) => void;
    onEdit: (item: JobApplication) => void;
    onRemove: (id: string) => void;
    onEditSection: () => void;
    onDeleteSection: () => void;
    overId: string | null;
};

export type DashboardScreenController = {
    actions: {
        removeJobApplication: (id: string) => void;
        logout: () => Promise<void>;
        navigateToProfile: () => void;
        openAddModal: (sectionId: string) => void;
        openEditModal: (item: JobApplication) => void;
        openViewModal: (item: JobApplication) => void;
        closeViewModal: () => void;
        closeModal: () => void;
        openSectionModal: (section: Section | null, isNew: boolean) => void;
        closeSectionModal: () => void;
        handleAddSection: () => void;
        handleDragStart: (event: import('@dnd-kit/core').DragStartEvent) => void;
        handleDragEnd: (event: import('@dnd-kit/core').DragEndEvent) => void;
        handleDragOver: (event: {over: {id: unknown} | null}) => void;
        onSubmitJobApplicationForm: SubmitHandler<JobApplicationFormValues>;
        onSubmitSectionForm: SubmitHandler<SectionFormValues>;
        handleDeleteSection: (sectionId: string) => void;
        confirmDeleteSection: () => void;
        cancelDeleteSection: () => void;
    };
    states: {
        sections: Section[];
        jobApplicationsBySection: Record<string, JobApplication[]>;
        userEmail: string;
        userName: string;
        sensors: SensorDescriptor<any>[];
        collisionDetection: CollisionDetection;
        overId: string | null;
        activeId: string | null;
        editModal: EditModalState;
        sectionModal: SectionModalState;
        deleteSectionConfirm: DeleteSectionConfirmState;
        sectionIds: string[];
        activeJobApplication: JobApplication | undefined;
        activeSection: Section | null;
        isJobEditModalOpen: boolean;
        isViewJobModalOpen: boolean;
        viewModalJob: JobApplication | null;
        isSectionModalOpen: boolean;
        jobForm: UseFormReturn<JobApplicationFormValues>;
        sectionForm: UseFormReturn<SectionFormValues>;
    };
};

export type DashboardScreenComponentProps = {
    controller: DashboardScreenController;
};
