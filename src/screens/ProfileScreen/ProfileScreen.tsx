import React from 'react';
import {UseProfileScreenController} from './ProfileScreen.controller';
import {ProfileScreenComponent} from './ProfileScreen.component';

export const ProfileScreen: React.FC = () => {
    const controller = UseProfileScreenController();
    return <ProfileScreenComponent controller={controller} />;
};
