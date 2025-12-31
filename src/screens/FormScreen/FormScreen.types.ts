import {z} from 'zod';
import React from "react";

export const personalInfoSchema = z.object({
    fullName: z.string().min(3, 'Nome completo é obrigatório'),
    email: z.string().email('Endereço de e-mail inválido'),
    phone: z.string().min(10, 'Número de telefone é obrigatório'),
    address: z.string().min(5, 'Endereço é obrigatório'),
    linkedin: z.string().optional(),
    website: z.string().optional(),
});

const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;

export const experienceSchema = z.object({
    company: z.string().min(2, 'Nome da empresa é obrigatório'),
    position: z.string().min(2, 'Cargo é obrigatório'),
    startDate: z.string().regex(dateRegex, 'Data inválida (MM/AAAA)'),
    endDate: z.string().optional(),
    isCurrent: z.boolean().optional(),
    description: z.string().min(10, 'Descrição deve ter no minimo 10 caracteres'),
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
    institution: z.string().min(2, 'Instituição é obrigatória'),
    degree: z.string().min(2, 'Grau é obrigatório'),
    fieldOfStudy: z.string().min(2, 'Área de estudo é obrigatória'),
    graduationDate: z.string().optional(),
    isStudying: z.boolean().optional(),
}).refine((data) => {
    if (!data.isStudying) {
        if (!data.graduationDate) return false;
        return dateRegex.test(data.graduationDate);
    }
    // Se estiver estudando, a data é opcional, mas se fornecida deve ser válida
    if (data.graduationDate && data.graduationDate.length > 0) {
        return dateRegex.test(data.graduationDate);
    }
    return true;
}, {
    message: "Data de graduação é obrigatória e deve ser válida (MM/AAAA) se não estiver cursando",
    path: ["graduationDate"],
});

export const skillSchema = z.object({
    name: z.string().min(2, 'Nome da habilidade é obrigatório'),
    level: z.enum([
        'Iniciante',
        'Intermediário',
        'Avançado',
        'Especialista'
    ]),
});

export const formSchema = z.object({
    personalInfo: personalInfoSchema,
    summary: z.string().min(20, 'O resumo deve ter pelo menos 20 caracteres'),
    experience: z.array(experienceSchema).min(1, 'Pelo menos uma experiência é necessária'),
    education: z.array(educationSchema).min(1, 'Pelo menos uma formação é necessária'),
    skills: z.array(skillSchema).min(1, 'Pelo menos uma habilidade é necessária'),
    selectedTemplate: z.number().min(1).max(5),
});

export type FormData = z.infer<typeof formSchema>;


export type  FormScreenComponentProps = {
    controller: {
        actions: {
            scrollToSection: (id: string) => void
            register: any;
            handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
            appendExperience: (value: any) => void;
            removeExperience: (index: number) => void;
            appendEducation: (value: any) => void;
            removeEducation: (index: number) => void;
            appendSkill: (value: any) => void;
            removeSkill: (index: number) => void;
            setTemplate: (id: number) => void;
            watch: any;
            setValue: any;
            handlePhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
            handleDateChange: (e: React.ChangeEvent<HTMLInputElement>, fieldName: any) => void;
        };
        states: {
            activeSection: string
            errors: any;
            experienceFields: any[];
            educationFields: any[];
            skillFields: any[];
            selectedTemplate: number;
        };
    }

}