import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {FormData, formSchema} from './FormScreen.types';
import React, {useEffect, useState} from "react";
import {useResumeContext} from "../../context/ResumeContext.tsx";


export const UseFormScreenController = () => {
    const [activeSection, setActiveSection] = useState('personal');

    const {setResumeData} = useResumeContext()

    const navigate = useNavigate();
    const {
        register,
        control,
        handleSubmit,
        formState: {errors},
        watch,
        setValue
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        mode: 'onChange',
        defaultValues: {
            experience: [{company: '', position: '', startDate: '', endDate: '', description: '', isCurrent: false}],
            education: [{institution: '', degree: '', fieldOfStudy: '', graduationDate: '', isStudying: false}],
            skills: [{name: '', level: 'Iniciante'}],
            selectedTemplate: 1
        }
    });

    const {fields: experienceFields, append: appendExperience, remove: removeExperience} = useFieldArray({
        control,
        name: "experience"
    });

    const {fields: educationFields, append: appendEducation, remove: removeEducation} = useFieldArray({
        control,
        name: "education"
    });

    const {fields: skillFields, append: appendSkill, remove: removeSkill} = useFieldArray({
        control,
        name: "skills"
    });

    const onSubmit = (data: FormData) => {
        setResumeData(data)
        navigate('/generating');
    };

    const selectedTemplate = watch('selectedTemplate');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const maskPhone = (value: string) => {
        if (!value) return "";
        value = value.replace(/\D/g, "");
        if (value.length > 11) value = value.slice(0, 11);

        if (value.length > 10) {
            return value.replace(/^(\d{2})(\d{1})(\d{4})(\d{4}).*/, "($1) $2 $3-$4");
        } else if (value.length > 6) {
            return value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (value.length > 2) {
            return value.replace(/^(\d{2})(\d{0,5}).*/, "($1) $2");
        } else {
            return value;
        }
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.value = maskPhone(e.target.value);
        register('personalInfo.phone').onChange(e);
    };

    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                setActiveSection('template');
                return;
            }

            const sections = [
                'personal',
                'summary',
                'experience',
                'education',
                'skills',
                'template'
            ];
            let current = 'personal';
            const offset = 150;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= offset) current = section;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return {
        actions: {
            register,
            handleSubmit: handleSubmit(onSubmit),
            appendExperience,
            removeExperience,
            appendEducation,
            removeEducation,
            appendSkill,
            removeSkill,
            scrollToSection,
            setTemplate: (id: number) => setValue('selectedTemplate', id),
            watch,
            setValue,
            handlePhoneChange
        },
        states: {
            errors,
            activeSection,
            experienceFields,
            educationFields,
            skillFields,
            selectedTemplate
        }
    };
};