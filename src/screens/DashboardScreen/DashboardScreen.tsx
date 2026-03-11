import React from 'react';
import {UseDashboardScreenController} from './DashboardScreen.controller';
import {DashboardScreenComponent} from './DashboardScreen.component';

export const DashboardScreen: React.FC = () => {
    const controller = UseDashboardScreenController();
    return <DashboardScreenComponent controller={controller} />;
};
