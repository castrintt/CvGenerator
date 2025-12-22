import {z} from 'zod';

import React from "react";
import type {IResumeService} from "../../../business/service/Resume.interface.ts";
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

export const feedbackSchema = z.object({
    feedback: z.string().min(10, 'Por favor, forneça pelo menos 10 caracteres de feedback'),
});

export type FeedbackData = z.infer<typeof feedbackSchema>;

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

