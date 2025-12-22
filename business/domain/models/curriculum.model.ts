export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    website?: string;
}

export interface Experience {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
}

export interface Education {
    institution: string;
    degree: string;
    isStudying?: boolean
    fieldOfStudy: string;
    graduationDate?: string;
}

export interface Skill {
    name: string;
    level: "Iniciante" | "Intermediário" | "Avançado" | "Especialista"
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    skills: Skill[];
    selectedTemplate: number;
}
