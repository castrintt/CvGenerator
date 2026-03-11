export type HomeScreenComponentProps = {
    controller: {
        actions: {
            goToLogin: () => void;
            goToResume: () => void;
            goToDashboard: () => void;
        };
        states: {
            isLoggedIn: boolean;
        };
    };
};
