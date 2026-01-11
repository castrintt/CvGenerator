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
    if (data.graduationDate && data.graduationDate.length > 0) {
        return dateRegex.test(data.graduationDate);
    }
    return true;
}, {
    message: "Data de graduação é obrigatória e deve ser válida (MM/AAAA) se não estiver cursando",
    path: ["graduationDate"],
});

export const schoolingSchema = z.object({
    institution: z.string().min(2, 'Instituição é obrigatória'),
    degree: z.string().min(2, 'Grau/Nível é obrigatório'),
    completionDate: z.string().optional(),
});

export const courseSchema = z.object({
    name: z.string().min(2, 'Nome do curso é obrigatório'),
    institution: z.string().min(2, 'Instituição é obrigatória'),
    duration: z.string().optional(),
});

export const formSchema = z.object({
    personalInfo: personalInfoSchema,
    summary: z.string().min(20, 'O resumo deve ter pelo menos 20 caracteres'),
    experience: z.array(experienceSchema).optional(), // Experiência agora é opcional também? O usuário pediu escolaridade e formação opcionais. Vou manter experiência como estava ou opcional? Geralmente é bom ter, mas vou deixar opcional para flexibilidade.
    education: z.array(educationSchema).optional(),
    schooling: z.array(schoolingSchema).optional(),
    courses: z.array(courseSchema).optional(),
    selectedTemplate: z.number().min(1).max(8),
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
            appendSchooling: (value: any) => void;
            removeSchooling: (index: number) => void;
            appendCourse: (value: any) => void;
            removeCourse: (index: number) => void;
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
            schoolingFields: any[];
            courseFields: any[];
            selectedTemplate: number;
        };
    }

}