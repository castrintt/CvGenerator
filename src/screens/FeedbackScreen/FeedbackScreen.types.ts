import {z} from 'zod';

import React from "react";
import type {IResumeService} from "../../../business/service/Resume.interface.ts";
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";
import {INPUT_LIMITS} from "../../../business/shared/validation/limits";

export const feedbackSchema = z.object({
    feedback: z
        .string()
        .trim()
        .min(10, 'Por favor, forneça pelo menos 10 caracteres de feedback')
        .max(INPUT_LIMITS.feedback, `Máximo de ${INPUT_LIMITS.feedback} caracteres`),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;

export type FeedbackScreenResumeTemplateProps = {
    resumeData: ResumeData;
};

export type ResumeControllerInjectTypes = {
    resumeService: IResumeService

}

export type FeedbackScreenComponentProps = {
    controller: {
        actions: {
            register: any;
            handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
            setDownloadFormat: (format: 'pdf' | 'png' | 'jpeg') => void;
            handleDownload: () => void;
            goToCreateAnother: () => void;
        };
        states: {
            errors: any;
            isSubmitting: boolean;
            isFeedbackSent: boolean;
            downloadFormat: 'pdf' | 'png' | 'jpeg';
            resumeData: ResumeData | null;
        };
    }
}

