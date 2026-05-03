import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'sonner';
import {useAuth} from '../../context/AuthContext';
import {container} from '../../../business/ioc/ioc.config';
import {UserSymbols} from '../../../business/ioc/symbols/user.symbols';
import type {IUserService} from '../../../business/domain/interfaces/i-user.service';
import type {
    ProfilePasswordFormState,
    ProfilePersonalDataFormState,
    ProfileScreenController,
} from './ProfileScreen.types';

const MINIMUM_PASSWORD_LENGTH = 8;

const hasPasswordComplexity = (password: string): boolean =>
    /\d/.test(password) && /[^a-zA-Z0-9]/.test(password);

const userService = container.get<IUserService>(UserSymbols.UserService);

export const UseProfileScreenController = (): ProfileScreenController => {
    const navigate = useNavigate();
    const {user, updateUser} = useAuth();

    const [isEditingPersonalData, setIsEditingPersonalData] = useState(false);
    const [isSavingPersonalData, setIsSavingPersonalData] = useState(false);
    const [isSubmittingPassword, setIsSubmittingPassword] = useState(false);

    const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
    const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

    const [personalDataForm, setPersonalDataForm] = useState<ProfilePersonalDataFormState>({
        name: user?.name ?? '',
        email: user?.email ?? '',
    });

    const [passwordForm, setPasswordForm] = useState<ProfilePasswordFormState>({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const navigateToDashboard = () => navigate('/dashboard');

    const enablePersonalDataEdit = () => {
        setPersonalDataForm({name: user?.name ?? '', email: user?.email ?? ''});
        setIsEditingPersonalData(true);
    };

    const cancelPersonalDataEdit = () => {
        setIsEditingPersonalData(false);
    };

    const savePersonalData = async () => {
        const trimmedName = personalDataForm.name.trim();
        if (!trimmedName) {
            toast.error('O nome não pode estar vazio.');
            return;
        }
        if (!user?.id) return;

        setIsSavingPersonalData(true);
        try {
            await userService.updatePersonalData({
                id: user.id,
                name: trimmedName,
                email: personalDataForm.email.trim(),
            });
            updateUser({name: trimmedName, email: personalDataForm.email.trim()});
            toast.success('Dados pessoais atualizados com sucesso.');
            setIsEditingPersonalData(false);
        } catch {
            toast.error('Erro ao atualizar dados pessoais. Tente novamente.');
        } finally {
            setIsSavingPersonalData(false);
        }
    };

    const submitPasswordChange = async () => {
        if (!passwordForm.currentPassword) {
            toast.error('Informe a senha atual.');
            return;
        }
        if (passwordForm.newPassword.length < MINIMUM_PASSWORD_LENGTH) {
            toast.error(`A nova senha deve ter pelo menos ${MINIMUM_PASSWORD_LENGTH} caracteres.`);
            return;
        }
        if (!hasPasswordComplexity(passwordForm.newPassword)) {
            toast.error('A nova senha precisa conter pelo menos um número e um caractere especial.');
            return;
        }
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            toast.error('A confirmação de senha não coincide com a nova senha.');
            return;
        }
        if (!user?.id) return;

        setIsSubmittingPassword(true);
        try {
            await userService.updatePassword({
                id: user.id,
                newPassword: passwordForm.newPassword,
            });
            toast.success('Senha alterada com sucesso.');
            setPasswordForm({currentPassword: '', newPassword: '', confirmPassword: ''});
        } catch {
            toast.error('Erro ao alterar senha. Tente novamente.');
        } finally {
            setIsSubmittingPassword(false);
        }
    };

    const cancelPasswordChange = () => {
        setPasswordForm({currentPassword: '', newPassword: '', confirmPassword: ''});
    };

    const updatePersonalDataField = (
        field: keyof ProfilePersonalDataFormState,
        value: string,
    ) => {
        setPersonalDataForm((prev) => ({...prev, [field]: value}));
    };

    const updatePasswordField = (field: keyof ProfilePasswordFormState, value: string) => {
        setPasswordForm((prev) => ({...prev, [field]: value}));
    };

    return {
        actions: {
            navigateToDashboard,
            enablePersonalDataEdit,
            cancelPersonalDataEdit,
            savePersonalData,
            submitPasswordChange,
            cancelPasswordChange,
            updatePersonalDataField,
            updatePasswordField,
            toggleCurrentPasswordVisibility: () => setIsCurrentPasswordVisible((p) => !p),
            toggleNewPasswordVisibility: () => setIsNewPasswordVisible((p) => !p),
            toggleConfirmPasswordVisibility: () => setIsConfirmPasswordVisible((p) => !p),
        },
        states: {
            userName: user?.name ?? '',
            userEmail: user?.email ?? '',
            isEditingPersonalData,
            isSavingPersonalData,
            personalDataForm,
            passwordForm,
            isCurrentPasswordVisible,
            isNewPasswordVisible,
            isConfirmPasswordVisible,
            isSubmittingPassword,
        },
    };
};
