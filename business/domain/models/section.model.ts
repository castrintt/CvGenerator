export type SectionColorKey =
    | 'applied'
    | 'in_progress'
    | 'positive_feedback'
    | 'rejected'
    | 'custom';

export interface Section {
    id: string;
    name: string;
    order: number;
    colorKey: SectionColorKey;
}

export const DEFAULT_SECTIONS: Omit<Section, 'id'>[] = [
    { name: 'Vagas Candidatadas', order: 0, colorKey: 'applied' },
    { name: 'Em Processo', order: 1, colorKey: 'in_progress' },
    { name: 'Devolutivas Positivas', order: 2, colorKey: 'positive_feedback' },
    { name: 'Negadas', order: 3, colorKey: 'rejected' },
];
