export type ProfilePersonalDataFormState = {
    name: string;
    email: string;
};

export type ProfilePasswordFormState = {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};

export type ProfileScreenController = {
    actions: {
        navigateToDashboard: () => void;
        enablePersonalDataEdit: () => void;
        cancelPersonalDataEdit: () => void;
        savePersonalData: () => void;
        submitPasswordChange: () => void;
        cancelPasswordChange: () => void;
        updatePersonalDataField: (field: keyof ProfilePersonalDataFormState, value: string) => void;
        updatePasswordField: (field: keyof ProfilePasswordFormState, value: string) => void;
        toggleCurrentPasswordVisibility: () => void;
        toggleNewPasswordVisibility: () => void;
        toggleConfirmPasswordVisibility: () => void;
    };
    states: {
        userName: string;
        userEmail: string;
        isEditingPersonalData: boolean;
        isSavingPersonalData: boolean;
        personalDataForm: ProfilePersonalDataFormState;
        passwordForm: ProfilePasswordFormState;
        isCurrentPasswordVisible: boolean;
        isNewPasswordVisible: boolean;
        isConfirmPasswordVisible: boolean;
        isSubmittingPassword: boolean;
    };
};

export type ProfileScreenComponentProps = {
    controller: ProfileScreenController;
};
