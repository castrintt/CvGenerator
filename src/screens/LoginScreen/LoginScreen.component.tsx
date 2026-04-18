import React from 'react';
import {
    BackButton,
    ButtonGroup,
    Card,
    Container,
    Header,
    ToggleMode,
} from './LoginScreen.styles';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import type {LoginScreenComponentProps} from './LoginScreen.types';

export const LoginScreenComponent: React.FC<LoginScreenComponentProps> = ({controller}) => {
    const isRegister = controller.states.mode === 'register';
    const isChoice = controller.states.mode === 'choice';
    const loginForm = controller.states.loginForm;
    const registerForm = controller.states.registerForm;

    if (isChoice) {
        return (
            <Container>
                <BackButton onClick={controller.actions.goBack}>← Voltar</BackButton>
                <Card>
                    <Header>
                        <h1>Entrar</h1>
                        <p>Escolha como deseja acessar a plataforma</p>
                    </Header>

                    <ButtonGroup>
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => controller.actions.setMode('register')}
                        >
                            Criar nova conta
                        </Button>
                        <Button
                            variant="outline"
                            fullWidth
                            onClick={() => controller.actions.setMode('login')}
                        >
                            Já tenho uma conta
                        </Button>
                    </ButtonGroup>

                </Card>
            </Container>
        );
    }

    if (isRegister) {
        return (
            <Container>
                <BackButton onClick={() => controller.actions.setMode('choice')}>← Voltar</BackButton>
                <Card>
                    <Header>
                        <h1>Criar conta</h1>
                        <p>Preencha os dados para criar sua conta</p>
                    </Header>

                    <form onSubmit={controller.actions.submitRegister}>
                        <Input
                            label="Nome"
                            type="text"
                            placeholder="Seu nome completo"
                            {...registerForm.register('name')}
                            error={registerForm.formState.errors.name?.message}
                        />
                        <Input
                            label="E-mail"
                            type="email"
                            placeholder="seu@email.com"
                            {...registerForm.register('email')}
                            error={registerForm.formState.errors.email?.message}
                        />
                        <Input
                            label="Senha"
                            type="password"
                            placeholder="Mínimo 6 caracteres"
                            {...registerForm.register('password')}
                            error={registerForm.formState.errors.password?.message}
                        />
                        <Input
                            label="Confirmar senha"
                            type="password"
                            placeholder="Repita a senha"
                            {...registerForm.register('confirmPassword')}
                            error={registerForm.formState.errors.confirmPassword?.message}
                        />
                        <ButtonGroup>
                            <Button type="submit" fullWidth disabled={controller.states.isLoading}>
                                {controller.states.isLoading ? 'Criando...' : 'Criar conta'}
                            </Button>
                        </ButtonGroup>
                    </form>

                    <ToggleMode>
                        Já tem conta?{' '}
                        <button type="button" onClick={() => controller.actions.setMode('login')}>
                            Fazer login
                        </button>
                    </ToggleMode>
                </Card>
            </Container>
        );
    }

    return (
        <Container>
            <BackButton onClick={() => controller.actions.setMode('choice')}>← Voltar</BackButton>
            <Card>
                <Header>
                    <h1>Fazer login</h1>
                    <p>Entre com seu e-mail e senha</p>
                </Header>

                <form onSubmit={controller.actions.submitLogin}>
                    <Input
                        label="E-mail"
                        type="email"
                        placeholder="seu@email.com"
                        {...loginForm.register('email')}
                        error={loginForm.formState.errors.email?.message}
                    />
                    <Input
                        label="Senha"
                        type="password"
                        placeholder="Sua senha"
                        {...loginForm.register('password')}
                        error={loginForm.formState.errors.password?.message}
                    />
                    <ButtonGroup>
                        <Button type="submit" fullWidth disabled={controller.states.isLoading}>
                            {controller.states.isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </ButtonGroup>
                </form>

                <ToggleMode>
                    Não tem conta?{' '}
                    <button type="button" onClick={() => controller.actions.setMode('register')}>
                        Criar conta
                    </button>
                </ToggleMode>
            </Card>
        </Container>
    );
};
