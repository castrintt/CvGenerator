import React from 'react';
import {Container, Header, OptionCard, OptionsGrid} from './HomeScreen.styles';
import {Button} from '../../components/Button/Button';
import type {HomeScreenComponentProps} from './HomeScreen.types';

export const HomeScreenComponent: React.FC<HomeScreenComponentProps> = ({controller}) => {
    return (
        <Container>
            <Header>
                <h1>Curriculum generator</h1>
                <p>Escolha como deseja continuar</p>
                {controller.states.isLoggedIn && (
                    <p style={{marginTop: 12}}>
                        <button
                            type="button"
                            onClick={controller.actions.goToDashboard}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--accent-color)',
                                cursor: 'pointer',
                                textDecoration: 'underline',
                                fontSize: 14,
                            }}
                        >
                            Já está logado? Ir para o painel →
                        </button>
                    </p>
                )}
            </Header>

            <OptionsGrid>
                <OptionCard onClick={controller.actions.goToLogin}>
                    <h2>Plataforma de Candidaturas</h2>
                    <p>Faça login para acessar o controle das suas candidaturas e organizar suas vagas.</p>
                    <Button fullWidth style={{marginTop: 24}}>
                        Fazer Login
                    </Button>
                </OptionCard>

                <OptionCard onClick={controller.actions.goToResume}>
                    <h2>Gerar Currículo</h2>
                    <p>Crie um currículo profissional em minutos. Preencha os dados e escolha um modelo. Não precisa de cadastro e nenhum dos dados será salvo.</p>
                    <Button variant="outline" fullWidth style={{marginTop: 24}}>
                        Gerar Currículo
                    </Button>
                </OptionCard>
            </OptionsGrid>
        </Container>
    );
};
