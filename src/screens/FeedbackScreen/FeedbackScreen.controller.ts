import {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FeedbackData, feedbackSchema, type ResumeControllerInjectTypes} from './FeedbackScreen.types';
import {useResumeContext} from "../../context/ResumeContext.tsx";
import {useNavigate} from "react-router-dom";
import emailjs from '@emailjs/browser';

export const UseFeedbackScreenController = ({resumeService}: ResumeControllerInjectTypes) => {
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'png' | 'jpeg'>('pdf');
    const {resumeData} = useResumeContext()
    const navigate = useNavigate();

    useEffect(() => {
        if (!resumeData) {
            navigate('/');
        }
    }, [resumeData, navigate]);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<FeedbackData>({
        resolver: zodResolver(feedbackSchema)
    });

    const onSubmit = async (data: FeedbackData) => {
        // TODO: Substitua pelos seus IDs do EmailJS (https://www.emailjs.com/)
        const SERVICE_ID = 'YOUR_SERVICE_ID';
        const TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
        const PUBLIC_KEY = 'YOUR_PUBLIC_KEY';

        try {
            // Verifica se as chaves foram configuradas
            if (SERVICE_ID === 'YOUR_SERVICE_ID') {
                console.warn('EmailJS não configurado. Simulando envio...');
                console.log('Feedback:', data.feedback);
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                await emailjs.send(
                    SERVICE_ID,
                    TEMPLATE_ID,
                    {
                        message: data.feedback,
                        to_email: 'igordc38@gmail.com', // Variável que deve estar no seu template do EmailJS
                        from_name: 'Usuário CV Generator'
                    },
                    PUBLIC_KEY
                );
            }
            
            setIsFeedbackSent(true);
        } catch (error) {
            console.error('Erro ao enviar feedback:', error);
            alert('Ocorreu um erro ao enviar o feedback. Por favor, tente novamente.');
        }
    };

    async function handleDownload() {
        if (downloadFormat === 'pdf') return await resumeService.generatePDF('resume-preview');
        await resumeService.generateImage('resume-preview', downloadFormat);
    }

    return {
        actions: {
            register,
            handleSubmit: handleSubmit(onSubmit),
            setDownloadFormat,
            handleDownload
        },
        states: {
            errors,
            isSubmitting,
            isFeedbackSent,
            downloadFormat,
            resumeData
        }
    };
};