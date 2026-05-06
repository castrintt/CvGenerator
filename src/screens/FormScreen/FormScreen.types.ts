import {z} from 'zod';
import React from 'react';
import {ResumeTemplate} from '../../../business/domain/models/curriculum.model';
import type {ResumeData} from '../../../business/domain/models/curriculum.model';
import {INPUT_LIMITS} from '../../../business/shared/validation/limits';
import {zodResumeOptionalProfileLinkField} from '../../../business/shared/validation/safe-http-url';

export const personalInfoSchema = z.object({
    fullName: z
        .string()
        .trim()
        .min(3, 'Nome completo é obrigatório')
        .max(INPUT_LIMITS.personName, `Máximo de ${INPUT_LIMITS.personName} caracteres`),
    email: z
        .string()
        .trim()
        .email('Endereço de e-mail inválido')
        .max(INPUT_LIMITS.email, `Máximo de ${INPUT_LIMITS.email} caracteres`),
    phone: z
        .string()
        .trim()
        .min(10, 'Número de telefone é obrigatório')
        .max(30, 'Telefone muito longo'),
    address: z
        .string()
        .trim()
        .min(5, 'Endereço é obrigatório')
        .max(300, 'Endereço muito longo'),
    linkedin: zodResumeOptionalProfileLinkField,
    website: zodResumeOptionalProfileLinkField,
});

const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

export const experienceSchema = z.object({
    company: z
        .string()
        .trim()
        .min(2, 'Nome da empresa é obrigatório')
        .max(INPUT_LIMITS.companyName, `Máximo de ${INPUT_LIMITS.companyName} caracteres`),
    position: z
        .string()
        .trim()
        .min(2, 'Cargo é obrigatório')
        .max(INPUT_LIMITS.jobTitle, `Máximo de ${INPUT_LIMITS.jobTitle} caracteres`),
    startDate: z.string().trim().regex(dateRegex, 'Data inválida (MM/AAAA)'),
    endDate: z.preprocess(
        (value) => (value === '' || value === undefined || value === null ? undefined : value),
        z.string().trim().max(10).optional(),
    ),
    isCurrent: z.boolean().optional(),
    description: z
        .string()
        .trim()
        .min(10, 'Descrição deve ter no minimo 10 caracteres')
        .max(INPUT_LIMITS.experienceDescription, `Máximo de ${INPUT_LIMITS.experienceDescription} caracteres`),
}).refine((data) => {
    if (!data.isCurrent) {
        if (!data.endDate) return false;
        return dateRegex.test(data.endDate);
    }
    return true;
}, {
    message: "Data de término é obrigatória e deve ser válida (MM/AAAA) se não for o emprego atual",
    path: ["endDate"],
});

export const educationSchema = z.object({
    institution: z
        .string()
        .trim()
        .min(2, 'Instituição é obrigatória')
        .max(INPUT_LIMITS.institution, `Máximo de ${INPUT_LIMITS.institution} caracteres`),
    degree: z
        .string()
        .trim()
        .min(2, 'Grau é obrigatório')
        .max(INPUT_LIMITS.degree, `Máximo de ${INPUT_LIMITS.degree} caracteres`),
    fieldOfStudy: z
        .string()
        .trim()
        .min(2, 'Área de estudo é obrigatória')
        .max(INPUT_LIMITS.fieldOfStudy, `Máximo de ${INPUT_LIMITS.fieldOfStudy} caracteres`),
    graduationDate: z.preprocess(
        (value) => (value === '' || value === undefined || value === null ? undefined : value),
        z.string().trim().max(10).optional(),
    ),
    isStudying: z.boolean().optional(),
}).refine((data) => {
    if (!data.isStudying) {
        if (!data.graduationDate) return false;
        return dateRegex.test(data.graduationDate);
    }
    if (data.graduationDate && data.graduationDate.length > 0) {
        return dateRegex.test(data.graduationDate);
    }
    return true;
}, {
    message: "Data de graduação é obrigatória e deve ser válida (MM/AAAA) se não estiver cursando",
    path: ["graduationDate"],
});

export const schoolingSchema = z.object({
    institution: z
        .string()
        .trim()
        .min(2, 'Instituição é obrigatória')
        .max(INPUT_LIMITS.institution, `Máximo de ${INPUT_LIMITS.institution} caracteres`),
    degree: z
        .string()
        .trim()
        .min(2, 'Grau/Nível é obrigatório')
        .max(INPUT_LIMITS.degree, `Máximo de ${INPUT_LIMITS.degree} caracteres`),
    completionDate: z.preprocess(
        (value) => (value === '' || value === undefined || value === null ? undefined : value),
        z.string().trim().max(10).optional(),
    ),
});

export const courseSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, 'Nome do curso é obrigatório')
        .max(INPUT_LIMITS.courseName, `Máximo de ${INPUT_LIMITS.courseName} caracteres`),
    institution: z
        .string()
        .trim()
        .min(2, 'Instituição é obrigatória')
        .max(INPUT_LIMITS.institution, `Máximo de ${INPUT_LIMITS.institution} caracteres`),
    duration: z.preprocess(
        (value) => (value === '' || value === undefined || value === null ? undefined : value),
        z.string().trim().max(INPUT_LIMITS.courseDuration, `Máximo de ${INPUT_LIMITS.courseDuration} caracteres`).optional(),
    ),
});

export const formSchema = z.object({
    personalInfo: personalInfoSchema,
    summary: z
        .string()
        .trim()
        .min(20, 'O resumo deve ter pelo menos 20 caracteres')
        .max(INPUT_LIMITS.summary, `Máximo de ${INPUT_LIMITS.summary} caracteres`),
    experience: z.array(experienceSchema).optional(),
    education: z.array(educationSchema).optional(),
    schooling: z.array(schoolingSchema).optional(),
    courses: z.array(courseSchema).optional(),
    selectedTemplate: z.nativeEnum(ResumeTemplate),
});

export type FormData = z.infer<typeof formSchema>;

export type FormScreenTemplateNameOption = {
    id: ResumeTemplate;
    name: string;
};

export const FORM_SCREEN_TEMPLATE_NAMES: FormScreenTemplateNameOption[] = [
    {id: ResumeTemplate.Classic,       name: 'Clássico'},
    {id: ResumeTemplate.ModernSidebar, name: 'Moderno Lateral'},
    {id: ResumeTemplate.Minimalist,    name: 'Minimalista'},
    {id: ResumeTemplate.Traditional,   name: 'Tradicional'},
    {id: ResumeTemplate.Creative,      name: 'Criativo'},
    {id: ResumeTemplate.Professional,  name: 'Profissional'},
    {id: ResumeTemplate.Elegant,       name: 'Elegante'},
    {id: ResumeTemplate.Tech,          name: 'Tech (Dark)'},
];

export const FORM_SCREEN_PREVIEW_FAKE_DATA: ResumeData = {
    personalInfo: {
        fullName: 'Maria Oliveira',
        email: 'maria.oliveira@email.com',
        phone: '(11) 98765-4321',
        address: 'Rio de Janeiro, RJ',
        linkedin: 'https://linkedin.com/in/mariaoliveira',
    },
    summary:
        'Profissional organizada e proativa com experiência em atendimento ao cliente e gestão administrativa. Busco oportunidades para aplicar minhas habilidades de comunicação e resolução de problemas.',
    experience: [
        {
            company: 'Comércio & Cia',
            position: 'Assistente Administrativo',
            startDate: '03/2019',
            endDate: '05/2022',
            description:
                'Responsável pelo atendimento ao cliente, organização de arquivos e suporte à gerência.',
        },
    ],
    education: [
        {
            institution: 'Universidade Federal',
            degree: 'Bacharelado',
            fieldOfStudy: 'Administração',
            graduationDate: '12/2018',
        },
    ],
    schooling: [
        {
            institution: 'Escola Estadual',
            degree: 'Ensino Médio Completo',
            completionDate: '12/2014',
        },
    ],
    courses: [
        {name: 'Excel Avançado', institution: 'Curso Online', duration: '40h'},
        {name: 'Inglês Intermediário', institution: 'Escola de Idiomas', duration: '2 anos'},
    ],
    selectedTemplate: ResumeTemplate.Classic,
};

export type FormScreenComponentProps = {
    controller: {
        actions: {
            scrollToSection: (id: string) => void;
            goBack: () => void;
            register: any;
            control: any;
            handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
            appendExperience: (value: any) => void;
            removeExperience: (index: number) => void;
            appendEducation: (value: any) => void;
            removeEducation: (index: number) => void;
            appendSchooling: (value: any) => void;
            removeSchooling: (index: number) => void;
            appendCourse: (value: any) => void;
            removeCourse: (index: number) => void;
            setTemplate: (id: number) => void;
            watch: any;
            setValue: any;
            openActionModal: (templateId: ResumeTemplate) => void;
            closeActionModal: () => void;
            selectTemplateFromModal: () => void;
            openPreviewFromModal: () => void;
            closePreview: () => void;
        };
        states: {
            activeSection: string
            errors: any;
            experienceFields: any[];
            educationFields: any[];
            schoolingFields: any[];
            courseFields: any[];
            selectedTemplate: ResumeTemplate;
            previewTemplateId: ResumeTemplate | null;
            actionModalTemplateId: ResumeTemplate | null;
            scale: number;
        };
    }

}
