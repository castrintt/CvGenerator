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

export interface Schooling {
    institution: string;
    degree: string;
    completionDate?: string;
}

export interface Course {
    name: string;
    institution: string;
    duration?: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    education: Education[];
    schooling: Schooling[];
    courses: Course[];
    selectedTemplate: number;
}