import React from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    BackButton,
    ButtonGroup,
    Card,
    Container,
    ErrorMessage,
    Header,
    ToggleMode,
} from './LoginScreen.styles';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import type {LoginScreenComponentProps} from './LoginScreen.types';
import {loginSchema, registerSchema} from './LoginScreen.types';

export const LoginScreenComponent: React.FC<LoginScreenComponentProps> = ({controller}) => {
    const isRegister = controller.states.mode === 'register';
    const isChoice = controller.states.mode === 'choice';

    const loginForm = useForm({
        resolver: zodResolver(loginSchema),
        defaultValues: {email: '', password: ''},
    });

    const registerForm = useForm({
        resolver: zodResolver(registerSchema),
        defaultValues: {email: '', password: '', confirmPassword: ''},
    });

    const onLoginSubmit = loginForm.handleSubmit((data) =>
        controller.actions.handleLogin(data.email, data.password)
    );

    const onRegisterSubmit = registerForm.handleSubmit((data) =>
        controller.actions.handleRegister(data.email, data.password)
    );

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
                            fullWidth
                            onClick={controller.actions.handleGoogleLogin}
                            disabled={controller.states.isLoading}
                        >
                            Continuar com Google
                        </Button>
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

                    {controller.states.error && (
                        <ErrorMessage>{controller.states.error}</ErrorMessage>
                    )}
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

                    <form onSubmit={onRegisterSubmit}>
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

                    {controller.states.error && (
                        <ErrorMessage>{controller.states.error}</ErrorMessage>
                    )}

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

                <form onSubmit={onLoginSubmit}>
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

                {controller.states.error && (
                    <ErrorMessage>{controller.states.error}</ErrorMessage>
                )}

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
