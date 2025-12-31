import React from 'react';
import {Container, DownloadSection, FeedbackForm, FormatOption, FormatSelector, PreviewArea, ResumePreview, Sidebar, SuccessMessage, TextArea, Title} from './FeedbackScreen.styles';
import {Button} from '../../components/Button/Button';
import {ClassicTemplate} from '../../components/ResumeTemplates/ClassicTemplate';
import {ModernSidebarTemplate} from '../../components/ResumeTemplates/ModernSidebarTemplate';
import {MinimalistTemplate} from '../../components/ResumeTemplates/MinimalistTemplate';
import {TraditionalTemplate} from '../../components/ResumeTemplates/TraditionalTemplate';
import {CreativeTemplate} from '../../components/ResumeTemplates/CreativeTemplate';
import {ProfessionalTemplate} from '../../components/ResumeTemplates/ProfessionalTemplate';
import {ElegantTemplate} from '../../components/ResumeTemplates/ElegantTemplate';
import {TechTemplate} from '../../components/ResumeTemplates/TechTemplate';
import type {FeedbackScreenComponentProps} from "./FeedbackScreen.types.ts";

const RenderTemplate = (resumeData: any) => {
    switch (resumeData.selectedTemplate) {
        case 1: return <ClassicTemplate data={resumeData}/>;
        case 2: return <ModernSidebarTemplate data={resumeData}/>;
        case 3: return <MinimalistTemplate data={resumeData}/>;
        case 4: return <TraditionalTemplate data={resumeData}/>;
        case 5: return <CreativeTemplate data={resumeData}/>;
        case 6: return <ProfessionalTemplate data={resumeData}/>;
        case 7: return <ElegantTemplate data={resumeData}/>;
        case 8: return <TechTemplate data={resumeData}/>;
        default: return <ClassicTemplate data={resumeData}/>;
    }
};

export const FeedbackScreenComponent: React.FC<FeedbackScreenComponentProps> = ({controller}) => {
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
                         <span style={{color: '#EB5757'}}>{controller.states.errors.feedback.message}</span>}

                        <Button type="submit" disabled={controller.states.isSubmitting}>
                            {controller.states.isSubmitting ? 'Enviando...' : 'Enviar Feedback'}
                        </Button>
                    </FeedbackForm>
                )}
            </Sidebar>

            <PreviewArea>
                <ResumePreview id="resume-preview">
                    {RenderTemplate(controller.states.resumeData)}
                </ResumePreview>
            </PreviewArea>
        </Container>
    );
};