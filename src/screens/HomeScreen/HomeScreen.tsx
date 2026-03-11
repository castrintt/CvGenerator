import React from 'react';
import {UseHomeScreenController} from './HomeScreen.controller';
import {HomeScreenComponent} from './HomeScreen.component';

export const HomeScreen: React.FC = () => {
    const controller = UseHomeScreenController();
    return <HomeScreenComponent controller={controller} />;
};
