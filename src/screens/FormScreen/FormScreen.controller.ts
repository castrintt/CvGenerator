import {useFieldArray, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom';
import {FormData, formSchema} from './FormScreen.types';
import React, {useEffect, useReducer} from "react";
import {useResumeContext} from "../../context/ResumeContext.tsx";
import {formScreenReducer, initialFormScreenUiState} from './FormScreen.reducer';


export const UseFormScreenController = () => {
    const [ui, dispatch] = useReducer(formScreenReducer, initialFormScreenUiState);
    const {activeSection, previewTemplateId, actionModalTemplateId, scale} = ui;

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
            education: [],
            schooling: [],
            courses: [],
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

    const {fields: schoolingFields, append: appendSchooling, remove: removeSchooling} = useFieldArray({
        control,
        name: "schooling"
    });

    const {fields: courseFields, append: appendCourse, remove: removeCourse} = useFieldArray({
        control,
        name: "courses"
    });

    const onSubmit = (data: FormData) => {
        setResumeData(data as any) // Cast necessário pois o tipo do contexto pode estar desatualizado temporariamente
        navigate('/generating');
    };

    const selectedTemplate = watch('selectedTemplate');

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const goBack = () => navigate('/');

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

    const maskDate = (value: string) => {
        if (!value) return "";
        value = value.replace(/\D/g, "");
        if (value.length > 6) value = value.slice(0, 6);

        if (value.length > 2) {
            return value.replace(/^(\d{2})(\d{0,4}).*/, "$1/$2");
        } else {
            return value;
        }
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: any) => {
        e.target.value = maskDate(e.target.value);
        register(fieldName).onChange(e);
    };

    useEffect(() => {
        const handleScroll = () => {
            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
                dispatch({type: 'SET_ACTIVE_SECTION', section: 'template'});
                return;
            }

            const sections = [
                'personal',
                'summary',
                'experience',
                'education',
                'schooling',
                'courses',
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
            dispatch({type: 'SET_ACTIVE_SECTION', section: current});
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (!previewTemplateId) return;

            const a4HeightMm = 297;
            const a4WidthMm = 210;

            const a4HeightPx = (a4HeightMm * 96) / 25.4;
            const a4WidthPx = (a4WidthMm * 96) / 25.4;

            const vh = window.innerHeight - 80;
            const vw = window.innerWidth - 80;

            const scaleHeight = vh / a4HeightPx;
            const scaleWidth = vw / a4WidthPx;

            const newScale = Math.min(scaleHeight, scaleWidth, 1);
            dispatch({type: 'SET_SCALE', scale: newScale});
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [previewTemplateId]);

    const openActionModal = (templateId: number) => {
        dispatch({type: 'OPEN_ACTION_MODAL', templateId});
    };

    const closeActionModal = () => {
        dispatch({type: 'CLOSE_ACTION_MODAL'});
    };

    const selectTemplateFromModal = () => {
        if (actionModalTemplateId !== null) {
            setValue('selectedTemplate', actionModalTemplateId);
        }
        dispatch({type: 'CLOSE_ACTION_MODAL'});
    };

    const openPreviewFromModal = () => {
        dispatch({type: 'OPEN_PREVIEW_FROM_MODAL'});
    };

    const closePreview = () => {
        dispatch({type: 'CLOSE_PREVIEW'});
    };

    return {
        actions: {
            register,
            handleSubmit: handleSubmit(onSubmit),
            appendExperience,
            removeExperience,
            appendEducation,
            removeEducation,
            appendSchooling,
            removeSchooling,
            appendCourse,
            removeCourse,
            scrollToSection,
            goBack,
            setTemplate: (id: number) => setValue('selectedTemplate', id),
            watch,
            setValue,
            handlePhoneChange,
            handleDateChange,
            openActionModal,
            closeActionModal,
            selectTemplateFromModal,
            openPreviewFromModal,
            closePreview,
        },
        states: {
            errors,
            activeSection,
            experienceFields,
            educationFields,
            schoolingFields,
            courseFields,
            selectedTemplate,
            previewTemplateId,
            actionModalTemplateId,
            scale,
        }
    };
};