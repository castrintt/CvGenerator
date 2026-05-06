import {z} from 'zod';
import {INPUT_LIMITS} from '../../../business/shared/validation/limits';
import {zodJobApplicationLinkField} from '../../../business/shared/validation/safe-http-url';
import {brToIso} from './DashboardScreen.utils';

export const jobApplicationFormSchema = z.object({
    company: z
        .string()
        .trim()
        .min(1, 'Nome da empresa é obrigatório')
        .max(INPUT_LIMITS.companyName, `Máximo de ${INPUT_LIMITS.companyName} caracteres`),
    position: z
        .string()
        .trim()
        .min(1, 'Cargo é obrigatório')
        .max(INPUT_LIMITS.jobTitle, `Máximo de ${INPUT_LIMITS.jobTitle} caracteres`),
    appliedDate: z
        .string()
        .trim()
        .refine((value) => brToIso(value) !== '', {
            message: 'Data inválida (use DD/MM/AAAA)',
        }),
    link: zodJobApplicationLinkField,
    notes: z
        .string()
        .trim()
        .max(INPUT_LIMITS.jobNotes, `Máximo de ${INPUT_LIMITS.jobNotes} caracteres`),
});

export const sectionFormSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, 'Nome da seção é obrigatório')
        .max(INPUT_LIMITS.sectionName, `Máximo de ${INPUT_LIMITS.sectionName} caracteres`),
});

export type JobApplicationFormSchemaIn = z.input<typeof jobApplicationFormSchema>;
export type SectionFormSchemaIn = z.input<typeof sectionFormSchema>;
