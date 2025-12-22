import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FeedbackData, feedbackSchema, type ResumeControllerInjectTypes} from './FeedbackScreen.types';
import {useResumeContext} from "../../context/ResumeContext.tsx";


export const UseFeedbackScreenController = ({resumeService}: ResumeControllerInjectTypes) => {
    const [isFeedbackSent, setIsFeedbackSent] = useState(false);
    const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'png' | 'jpeg'>('pdf');
    const {resumeData} = useResumeContext()

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting}
    } = useForm<FeedbackData>({
        resolver: zodResolver(feedbackSchema)
    });

    const onSubmit = async (data: FeedbackData) => {
        console.log('Sending feedback to igordc38@gmail.com:', data.feedback);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsFeedbackSent(true);
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