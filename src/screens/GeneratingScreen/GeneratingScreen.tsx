import React from 'react';
import {UseGeneratingScreenController} from './GeneratingScreen.controller';
import {GeneratingScreenComponent} from './GeneratingScreen.component';

export const GeneratingScreen: React.FC = () => {
    const controller = UseGeneratingScreenController();
    return (
        <GeneratingScreenComponent controller={controller}/>
    );
};