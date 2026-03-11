export type JobApplicationSectionId =
    | 'applied'
    | 'in_progress'
    | 'positive_feedback'
    | 'rejected'
    | 'cold';

export interface JobApplication {
    id: string;
    company: string;
    position: string;
    appliedDate: string;
    link?: string;
    notes?: string;
    sectionId: JobApplicationSectionId;
}

export const SECTION_LABELS: Record<JobApplicationSectionId, string> = {
    applied: 'Vagas Candidatadas',
    in_progress: 'Em Processo',
    positive_feedback: 'Devolutivas Positivas',
    rejected: 'Negadas',
    cold: 'Vagas Frias',
};
