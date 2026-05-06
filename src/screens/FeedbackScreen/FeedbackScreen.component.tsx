import React from 'react';
import { Button } from '../../components/Button/Button';
import { ClassicTemplate } from '../../components/ResumeTemplates/ClassicTemplate';
import { CreativeTemplate } from '../../components/ResumeTemplates/CreativeTemplate';
import { ElegantTemplate } from '../../components/ResumeTemplates/ElegantTemplate';
import { MinimalistTemplate } from '../../components/ResumeTemplates/MinimalistTemplate';
import { ModernSidebarTemplate } from '../../components/ResumeTemplates/ModernSidebarTemplate';
import { ProfessionalTemplate } from '../../components/ResumeTemplates/ProfessionalTemplate';
import { TechTemplate } from '../../components/ResumeTemplates/TechTemplate';
import { TraditionalTemplate } from '../../components/ResumeTemplates/TraditionalTemplate';
import { ResumeTemplate, type ResumeData } from '../../../business/domain/models/curriculum.model';
import { Container, DownloadSection, FeedbackForm, FormatOption, FormatSelector, PreviewArea, ResumePreview, Sidebar, SuccessMessage, TextArea, Title } from './FeedbackScreen.styles';
import type {
    FeedbackScreenComponentProps,
    FeedbackScreenResumeTemplateProps,
} from './FeedbackScreen.types';

const RESUME_TEMPLATE_COMPONENT_MAP: Record<ResumeTemplate, React.FC<{ data: ResumeData }>> = {
    [ResumeTemplate.Classic]:       ClassicTemplate,
    [ResumeTemplate.ModernSidebar]: ModernSidebarTemplate,
    [ResumeTemplate.Minimalist]:    MinimalistTemplate,
    [ResumeTemplate.Traditional]:   TraditionalTemplate,
    [ResumeTemplate.Creative]:      CreativeTemplate,
    [ResumeTemplate.Professional]:  ProfessionalTemplate,
    [ResumeTemplate.Elegant]:       ElegantTemplate,
    [ResumeTemplate.Tech]:          TechTemplate,
};

const ResumeTemplateRenderer: React.FC<FeedbackScreenResumeTemplateProps> = ({ resumeData }) => {
    const TemplateComponent = RESUME_TEMPLATE_COMPONENT_MAP[resumeData.selectedTemplate] ?? ClassicTemplate;
    return <TemplateComponent data={resumeData} />;
};

export const FeedbackScreenComponent: React.FC<FeedbackScreenComponentProps> = ({ controller }) => {
    if (!controller.states.resumeData) return <div>Nenhum dado de currículo encontrado. Por favor, volte e preencha o
        formulário.</div>;
    return (
        <Container>
            <Sidebar>
                <Title>Feedback</Title>

                {controller.states.isFeedbackSent ? (
                    <>
                        <SuccessMessage>
                            Obrigado pelo seu feedback! Agora você pode baixar seu currículo.
                        </SuccessMessage>

                        <DownloadSection>
                            <Title>Baixar Currículo</Title>
                            <FormatSelector>
                                <FormatOption
                                    $selected={controller.states.downloadFormat === 'pdf'}
                                    onClick={() => controller.actions.setDownloadFormat('pdf')}
                                >
                                    PDF
                                </FormatOption>
                                <FormatOption
                                    $selected={controller.states.downloadFormat === 'png'}
                                    onClick={() => controller.actions.setDownloadFormat('png')}
                                >
                                    PNG
                                </FormatOption>
                                <FormatOption
                                    $selected={controller.states.downloadFormat === 'jpeg'}
                                    onClick={() => controller.actions.setDownloadFormat('jpeg')}
                                >
                                    JPEG
                                </FormatOption>
                            </FormatSelector>
                            <Button onClick={controller.actions.handleDownload}>
                                Baixar como {controller.states.downloadFormat.toUpperCase()}
                            </Button>
                            <Button
                                variant="outline"
                                fullWidth
                                onClick={controller.actions.goToCreateAnother}
                                style={{ marginTop: 16 }}
                            >
                                Cadastrar outro currículo
                            </Button>
                        </DownloadSection>
                    </>
                ) : (
                    <FeedbackForm onSubmit={controller.actions.handleSubmit}>
                        <p>Não é necessário cadastro! O serviço é 100% gratuito. Para liberar o botão de download, por favor envie um feedback anônimo para nos ajudar a melhorar a plataforma.</p>
                        <TextArea
                            placeholder="O que você gostou? O que podemos melhorar?"
                            {...controller.actions.register('feedback')}
                        />
                        {controller.states.errors.feedback &&
                            <span style={{ color: '#EB5757' }}>{controller.states.errors.feedback.message}</span>}

                        <Button
                            type="submit"
                            isPending={controller.states.isSubmitting}
                            pendingShowsLabel
                        >
                            Enviar Feedback
                        </Button>
                    </FeedbackForm>
                )}
            </Sidebar>

            <PreviewArea>
                <ResumePreview id="resume-preview">
                    <ResumeTemplateRenderer resumeData={controller.states.resumeData} />
                </ResumePreview>
            </PreviewArea>
        </Container>
    );
};