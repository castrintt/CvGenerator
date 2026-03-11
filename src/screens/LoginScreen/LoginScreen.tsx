import React from 'react';
import {UseLoginScreenController} from './LoginScreen.controller';
import {LoginScreenComponent} from './LoginScreen.component';

export const LoginScreen: React.FC = () => {
    const controller = UseLoginScreenController();
    return <LoginScreenComponent controller={controller} />;
};
