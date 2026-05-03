import type {JobApplication} from '../../../business/domain/models/jobApplication.model';

export type JobApplicationCardProps = {
    jobApplication: JobApplication;
    colorKey: string;
    onView: () => void;
    onEdit: () => void;
    onRemove: () => void;
};
