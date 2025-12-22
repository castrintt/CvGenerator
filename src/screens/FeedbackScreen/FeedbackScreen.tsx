import React from 'react';
import {UseFeedbackScreenController} from './FeedbackScreen.controller';
import {FeedbackScreenComponent} from './FeedbackScreen.component';
import {ResumeService} from "../../../business/service/Resume.service.ts";

export const FeedbackScreen: React.FC = () => {
    const resumeService = new ResumeService();
    const controller = UseFeedbackScreenController({resumeService});
    return (
        <FeedbackScreenComponent controller={controller}/>
    );
};