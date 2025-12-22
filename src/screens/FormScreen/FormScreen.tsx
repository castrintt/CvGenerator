import React from 'react';
import {UseFormScreenController} from './FormScreen.controller';
import {FormScreenComponent} from './FormScreen.component';

export const FormScreen: React.FC = () => {
    const controller = UseFormScreenController();
    return (
        <FormScreenComponent controller={controller}/>
    );
};