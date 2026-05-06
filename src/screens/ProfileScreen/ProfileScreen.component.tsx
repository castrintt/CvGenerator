import React from 'react';
import {
    BackButton,
    Container,
    FieldValue,
    FormActions,
    FormRow,
    InputWrapper,
    PageHeader,
    PageSubtitle,
    PageWrapper,
    PasswordHint,
    PasswordToggle,
    SectionCard,
    SectionCardHeader,
    SectionCardIcon,
    SectionCardTitle,
    TextInput,
    UserSummaryCard,
    UserSummaryEmail,
    UserSummaryInfo,
    UserSummaryName,
    VerifiedBadge,
} from './ProfileScreen.styles';
import {Button} from '../../components/Button/Button';
import type {ProfileScreenComponentProps} from './ProfileScreen.types';

export const ProfileScreenComponent: React.FC<ProfileScreenComponentProps> = ({controller}) => {
    const s = controller.states;
    const a = controller.actions;
    const isProfileActionPending = s.isSavingPersonalData || s.isSubmittingPassword;

    return (
        <Container>
            <PageWrapper>
                <BackButton type="button" disabled={isProfileActionPending} onClick={a.navigateToDashboard}>
                    ← Voltar ao Dashboard
                </BackButton>

                <PageHeader>
                    <h1>Meu Perfil</h1>
                    <PageSubtitle>Gerencie suas informações pessoais e configurações de segurança.</PageSubtitle>
                </PageHeader>

                <UserSummaryCard>
                    <UserSummaryInfo>
                        <UserSummaryName>{s.userName || 'Usuário'}</UserSummaryName>
                        <UserSummaryEmail>{s.userEmail}</UserSummaryEmail>
                    </UserSummaryInfo>
                    <VerifiedBadge>✓ Conta Verificada</VerifiedBadge>
                </UserSummaryCard>

                <SectionCard>
                    <SectionCardHeader>
                        <SectionCardTitle>
                            <SectionCardIcon>👤</SectionCardIcon>
                            Dados Pessoais
                        </SectionCardTitle>
                        {!s.isEditingPersonalData && (
                            <Button variant="outline" onClick={a.enablePersonalDataEdit}>
                                Editar
                            </Button>
                        )}
                    </SectionCardHeader>

                    <FormRow>
                        <label>Nome Completo</label>
                        {s.isEditingPersonalData ? (
                            <TextInput
                                type="text"
                                value={s.personalDataForm.name}
                                onChange={(e) => a.updatePersonalDataField('name', e.target.value)}
                                placeholder="Seu nome completo"
                                autoFocus
                            />
                        ) : (
                            <FieldValue>{s.userName || '—'}</FieldValue>
                        )}
                    </FormRow>

                    <FormRow>
                        <label>Endereço de E-mail</label>
                        {s.isEditingPersonalData ? (
                            <TextInput
                                type="email"
                                value={s.personalDataForm.email}
                                onChange={(e) => a.updatePersonalDataField('email', e.target.value)}
                                placeholder="seu@email.com"
                            />
                        ) : (
                            <FieldValue>{s.userEmail || '—'}</FieldValue>
                        )}
                    </FormRow>

                    {s.isEditingPersonalData && (
                        <FormActions>
                            <Button
                                variant="outline"
                                type="button"
                                onClick={a.cancelPersonalDataEdit}
                                isPending={s.isSavingPersonalData}
                            >
                                Cancelar
                            </Button>
                            <Button
                                type="button"
                                onClick={a.savePersonalData}
                                isPending={s.isSavingPersonalData}
                                pendingShowsLabel
                            >
                                Salvar
                            </Button>
                        </FormActions>
                    )}
                </SectionCard>

                <SectionCard>
                    <SectionCardHeader>
                        <SectionCardTitle>
                            <SectionCardIcon>🔒</SectionCardIcon>
                            Segurança
                        </SectionCardTitle>
                    </SectionCardHeader>

                    <FormRow>
                        <label>Senha Atual</label>
                        <InputWrapper>
                            <TextInput
                                type={s.isCurrentPasswordVisible ? 'text' : 'password'}
                                value={s.passwordForm.currentPassword}
                                onChange={(e) => a.updatePasswordField('currentPassword', e.target.value)}
                                placeholder="••••••••"
                            />
                            <PasswordToggle
                                type="button"
                                onClick={a.toggleCurrentPasswordVisibility}
                                title={s.isCurrentPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {s.isCurrentPasswordVisible ? '🙈' : '👁'}
                            </PasswordToggle>
                        </InputWrapper>
                    </FormRow>

                    <FormRow>
                        <label>Nova Senha</label>
                        <InputWrapper>
                            <TextInput
                                type={s.isNewPasswordVisible ? 'text' : 'password'}
                                value={s.passwordForm.newPassword}
                                onChange={(e) => a.updatePasswordField('newPassword', e.target.value)}
                                placeholder="••••••••"
                            />
                            <PasswordToggle
                                type="button"
                                onClick={a.toggleNewPasswordVisibility}
                                title={s.isNewPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {s.isNewPasswordVisible ? '🙈' : '👁'}
                            </PasswordToggle>
                        </InputWrapper>
                        <PasswordHint>
                            A senha deve ter pelo menos 8 caracteres, incluindo um número e um caractere especial.
                        </PasswordHint>
                    </FormRow>

                    <FormRow>
                        <label>Confirmar Nova Senha</label>
                        <InputWrapper>
                            <TextInput
                                type={s.isConfirmPasswordVisible ? 'text' : 'password'}
                                value={s.passwordForm.confirmPassword}
                                onChange={(e) => a.updatePasswordField('confirmPassword', e.target.value)}
                                placeholder="••••••••"
                            />
                            <PasswordToggle
                                type="button"
                                onClick={a.toggleConfirmPasswordVisibility}
                                title={s.isConfirmPasswordVisible ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                                {s.isConfirmPasswordVisible ? '🙈' : '👁'}
                            </PasswordToggle>
                        </InputWrapper>
                    </FormRow>

                    <FormActions>
                        <Button
                            variant="outline"
                            type="button"
                            onClick={a.cancelPasswordChange}
                            isPending={s.isSubmittingPassword}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            onClick={a.submitPasswordChange}
                            isPending={s.isSubmittingPassword}
                            pendingShowsLabel
                        >
                            Atualizar Senha
                        </Button>
                    </FormActions>
                </SectionCard>
            </PageWrapper>
        </Container>
    );
};
