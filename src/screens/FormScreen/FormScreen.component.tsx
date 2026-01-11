import React, {useEffect, useState} from 'react';
import {CloseButton, Container, Divider, ExperienceCard, Header, MainContent, ModalContent, ModalOverlay, PreviewContainer, PrivacyNotice, RemoveButton, Row, Section, Sidebar, Step, StepIndicator, SubmitButtonContainer, TemplateCard, TemplateGrid, TemplateMiniature, TextArea, Title} from './FormScreen.styles';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import type {FormScreenComponentProps} from "./FormScreen.types.ts";
import {ClassicTemplate} from '../../components/ResumeTemplates/ClassicTemplate';
import {ModernSidebarTemplate} from '../../components/ResumeTemplates/ModernSidebarTemplate';
import {MinimalistTemplate} from '../../components/ResumeTemplates/MinimalistTemplate';
import {TraditionalTemplate} from '../../components/ResumeTemplates/TraditionalTemplate';
import {CreativeTemplate} from '../../components/ResumeTemplates/CreativeTemplate';
import {ProfessionalTemplate} from '../../components/ResumeTemplates/ProfessionalTemplate';
import {ElegantTemplate} from '../../components/ResumeTemplates/ElegantTemplate';
import {TechTemplate} from '../../components/ResumeTemplates/TechTemplate';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const FAKE_DATA: ResumeData = {
    personalInfo: {
        fullName: "Maria Oliveira",
        email: "maria.oliveira@email.com",
        phone: "(11) 98765-4321",
        address: "Rio de Janeiro, RJ",
        linkedin: "linkedin.com/in/mariaoliveira"
    },
    summary: "Profissional organizada e proativa com experiência em atendimento ao cliente e gestão administrativa. Busco oportunidades para aplicar minhas habilidades de comunicação e resolução de problemas.",
    experience: [
        {
            company: "Comércio & Cia",
            position: "Assistente Administrativo",
            startDate: "2019-03",
            endDate: "2022-05",
            description: "Responsável pelo atendimento ao cliente, organização de arquivos e suporte à gerência."
        }
    ],
    education: [
        {
            institution: "Universidade Federal",
            degree: "Bacharelado",
            fieldOfStudy: "Administração",
            graduationDate: "2018-12"
        }
    ],
    schooling: [
        {
            institution: "Escola Estadual",
            degree: "Ensino Médio Completo",
            completionDate: "2014-12"
        }
    ],
    courses: [
        {name: "Excel Avançado", institution: "Curso Online", duration: "40h"},
        {name: "Inglês Intermediário", institution: "Escola de Idiomas", duration: "2 anos"}
    ],
    selectedTemplate: 1
};

const RenderTemplatePreview = (templateId: number) => {
    const data = {...FAKE_DATA, selectedTemplate: templateId};
    switch (templateId) {
        case 1: return <ClassicTemplate data={data}/>;
        case 2: return <ModernSidebarTemplate data={data}/>;
        case 3: return <MinimalistTemplate data={data}/>;
        case 4: return <TraditionalTemplate data={data}/>;
        case 5: return <CreativeTemplate data={data}/>;
        case 6: return <ProfessionalTemplate data={data}/>;
        case 7: return <ElegantTemplate data={data}/>;
        case 8: return <TechTemplate data={data}/>;
        default: return <ClassicTemplate data={data}/>;
    }
};

const TEMPLATE_NAMES = [
    {id: 1, name: "Clássico"},
    {id: 2, name: "Moderno Lateral"},
    {id: 3, name: "Minimalista"},
    {id: 4, name: "Tradicional"},
    {id: 5, name: "Criativo"},
    {id: 6, name: "Profissional"},
    {id: 7, name: "Elegante"},
    {id: 8, name: "Tech (Dark)"}
];

export const FormScreenComponent: React.FC<FormScreenComponentProps> = ({controller}) => {
    const [previewTemplateId, setPreviewTemplateId] = useState<number | null>(null);
    const [scale, setScale] = useState(1);

    useEffect(() => {
        const handleResize = () => {
            if (!previewTemplateId) return;
            
            const a4HeightMm = 297;
            const a4WidthMm = 210;
            
            const a4HeightPx = (a4HeightMm * 96) / 25.4;
            const a4WidthPx = (a4WidthMm * 96) / 25.4;
            
            const vh = window.innerHeight - 80;
            const vw = window.innerWidth - 80;
            
            const scaleHeight = vh / a4HeightPx;
            const scaleWidth = vw / a4WidthPx;
            
            const newScale = Math.min(scaleHeight, scaleWidth, 1);
            setScale(newScale);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, [previewTemplateId]);

    const openPreview = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setPreviewTemplateId(id);
    };

    const closePreview = () => {
        setPreviewTemplateId(null);
    };

    return (
        <Container>
            <Sidebar>
                <div>
                    <h2 style={{fontSize: '24px', margin: 0}}>Onde você está</h2>
                </div>
                <StepIndicator>
                    <Step $active={controller.states.activeSection === 'personal'}
                          onClick={() => controller.actions.scrollToSection('personal')}>
                        <span>1</span> Informações Pessoais
                    </Step>
                    <Step $active={controller.states.activeSection === 'summary'}
                          onClick={() => controller.actions.scrollToSection('summary')}>
                        <span>2</span> Resumo Profissional
                    </Step>
                    <Step $active={controller.states.activeSection === 'experience'}
                          onClick={() => controller.actions.scrollToSection('experience')}>
                        <span>3</span> Experiência
                    </Step>
                    <Step $active={controller.states.activeSection === 'education'}
                          onClick={() => controller.actions.scrollToSection('education')}>
                        <span>4</span> Formação
                    </Step>
                    <Step $active={controller.states.activeSection === 'schooling'}
                          onClick={() => controller.actions.scrollToSection('schooling')}>
                        <span>5</span> Escolaridade
                    </Step>
                    <Step $active={controller.states.activeSection === 'courses'}
                          onClick={() => controller.actions.scrollToSection('courses')}>
                        <span>6</span> Cursos
                    </Step>
                    <Step $active={controller.states.activeSection === 'template'}
                          onClick={() => controller.actions.scrollToSection('template')}>
                        <span>7</span> Modelo
                    </Step>
                </StepIndicator>
            </Sidebar>

            <MainContent>
                <Header>
                    <h1>Crie seu Currículo Profissional</h1>
                    <p>Preencha os campos abaixo para gerar um currículo de alta qualidade em minutos.</p>
                </Header>

                <PrivacyNotice>
                    <strong>Privacidade Garantida:</strong> Nenhum dado pessoal inserido neste formulário é salvo em nossos servidores. Todas as informações permanecem no seu navegador e são descartadas assim que você fecha a página. A única preferência salva é o modo de cor (claro/escuro).
                </PrivacyNotice>

                <form onSubmit={controller.actions.handleSubmit}>
                    <Section id="personal">
                        <Title>Informações Pessoais</Title>
                        <Row>
                            <Input label="Nome Completo"
                                   placeholder="Ex: Maria Oliveira" {...controller.actions.register('personalInfo.fullName')}
                                   error={controller.states.errors.personalInfo?.fullName?.message}/>
                            <Input label="E-mail" placeholder="Ex: maria@email.com"
                                   type="email" {...controller.actions.register('personalInfo.email')}
                                   error={controller.states.errors.personalInfo?.email?.message}/>
                        </Row>
                        <Row>
                            <Input
                                label="Telefone"
                                placeholder="(99) 9 9999-9999"
                                {...controller.actions.register('personalInfo.phone')}
                                onChange={controller.actions.handlePhoneChange}
                                error={controller.states.errors.personalInfo?.phone?.message}
                            />
                            <Input label="Endereço"
                                   placeholder="Ex: Rio de Janeiro, RJ" {...controller.actions.register('personalInfo.address')}
                                   error={controller.states.errors.personalInfo?.address?.message}/>
                        </Row>
                        <Row>
                            <Input label="LinkedIn (Opcional)"
                                   placeholder="linkedin.com/in/mariaoliveira" {...controller.actions.register('personalInfo.linkedin')} />
                            <Input label="Site (Opcional)"
                                   placeholder="seusite.com" {...controller.actions.register('personalInfo.website')} />
                        </Row>
                    </Section>

                    <Divider/>

                    <Section id="summary">
                        <Title>Resumo Profissional</Title>
                        <TextArea
                            placeholder="Escreva um breve resumo sobre sua trajetória profissional, destacando suas principais qualidades e objetivos..."
                            {...controller.actions.register('summary')}
                        />
                        {controller.states.errors.summary &&
                         <span
                             style={{color: '#EB5757', fontSize: '12px'}}>{controller.states.errors.summary.message}</span>}
                    </Section>

                    <Divider/>

                    <Section id="experience">
                        <Title>Experiência Profissional (Opcional)</Title>
                        {controller.states.experienceFields.map((field, index) => {
                            const isCurrent = controller.actions.watch(`experience.${index}.isCurrent`);
                            return (
                                <ExperienceCard key={field.id}>
                                    <RemoveButton type="button"
                                                  onClick={() => controller.actions.removeExperience(index)}>
                                        Remover
                                    </RemoveButton>
                                    <Row>
                                        <Input label="Empresa"
                                               placeholder="Ex: Supermercado ABC" {...controller.actions.register(`experience.${index}.company`)}
                                               error={controller.states.errors.experience?.[index]?.company?.message}/>
                                        <Input label="Cargo"
                                               placeholder="Ex: Vendedor" {...controller.actions.register(`experience.${index}.position`)}
                                               error={controller.states.errors.experience?.[index]?.position?.message}/>
                                    </Row>
                                    <Row>
                                        <Input label="Data de Início (MM/AAAA)"
                                               placeholder="MM/AAAA"
                                               {...controller.actions.register(`experience.${index}.startDate`)}
                                               onChange={(e) => controller.actions.handleDateChange(e, `experience.${index}.startDate`)}
                                               error={controller.states.errors.experience?.[index]?.startDate?.message}/>

                                        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                            {!isCurrent && (
                                                <Input label="Data de Término (MM/AAAA)"
                                                       placeholder="MM/AAAA"
                                                       {...controller.actions.register(`experience.${index}.endDate`)}
                                                       onChange={(e) => controller.actions.handleDateChange(e, `experience.${index}.endDate`)}
                                                       error={controller.states.errors.experience?.[index]?.endDate?.message}/>
                                            )}
                                            <div
                                                style={{display: 'flex', alignItems: 'center', marginTop: isCurrent ? '30px' : '0'}}>
                                                <input
                                                    type="checkbox"
                                                    id={`current-${index}`}
                                                    {...controller.actions.register(`experience.${index}.isCurrent`)}
                                                    style={{marginRight: '8px', width: '16px', height: '16px'}}
                                                />
                                                <label htmlFor={`current-${index}`}
                                                       style={{fontSize: '14px', cursor: 'pointer'}}>
                                                    Trabalho aqui atualmente
                                                </label>
                                            </div>
                                        </div>
                                    </Row>
                                    <TextArea
                                        placeholder="Descreva suas principais responsabilidades..."
                                        style={{marginBottom: 0, minHeight: '100px'}}
                                        {...controller.actions.register(`experience.${index}.description`)}
                                    />
                                    {controller.states.errors.experience?.[index]?.description &&
                                     <span
                                         style={{color: '#EB5757', fontSize: '12px', marginTop: '6px', display: 'block'}}>{controller.states.errors.experience?.[index]?.description?.message}</span>}
                                </ExperienceCard>
                            );
                        })}
                        <Button type="button" variant="outline" fullWidth
                                onClick={() => controller.actions.appendExperience({company: '', position: '', startDate: '', endDate: '', description: '', isCurrent: false})}>
                            + Adicionar Experiência
                        </Button>
                    </Section>

                    <Divider/>

                    <Section id="education">
                        <Title>Formação Acadêmica (Faculdade/Universidade) (Opcional)</Title>
                        {controller.states.educationFields.map((field, index) => {
                            const isStudying = controller.actions.watch(`education.${index}.isStudying`);
                            return (
                                <ExperienceCard key={field.id}>
                                    <RemoveButton type="button"
                                                  onClick={() => controller.actions.removeEducation(index)}>
                                        Remover
                                    </RemoveButton>
                                    <Row>
                                        <Input label="Instituição"
                                               placeholder="Ex: Universidade Federal" {...controller.actions.register(`education.${index}.institution`)}
                                               error={controller.states.errors.education?.[index]?.institution?.message}/>
                                        <Input label="Grau"
                                               placeholder="Ex: Bacharelado" {...controller.actions.register(`education.${index}.degree`)}
                                               error={controller.states.errors.education?.[index]?.degree?.message}/>
                                    </Row>
                                    <Row>
                                        <Input label="Área de Estudo"
                                               placeholder="Ex: Administração" {...controller.actions.register(`education.${index}.fieldOfStudy`)}
                                               error={controller.states.errors.education?.[index]?.fieldOfStudy?.message}/>

                                        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                            <Input label={isStudying ? "Previsão de Conclusão (Opcional) (MM/AAAA)" : "Data de Graduação (MM/AAAA)"}
                                                   placeholder="MM/AAAA"
                                                   {...controller.actions.register(`education.${index}.graduationDate`)}
                                                   onChange={(e) => controller.actions.handleDateChange(e, `education.${index}.graduationDate`)}
                                                   error={controller.states.errors.education?.[index]?.graduationDate?.message}/>
                                            
                                            <div
                                                style={{display: 'flex', alignItems: 'center', marginTop: '10px'}}>
                                                <input
                                                    type="checkbox"
                                                    id={`studying-${index}`}
                                                    {...controller.actions.register(`education.${index}.isStudying`)}
                                                    style={{marginRight: '8px', width: '16px', height: '16px'}}
                                                />
                                                <label htmlFor={`studying-${index}`}
                                                       style={{fontSize: '14px', cursor: 'pointer'}}>
                                                    Cursando atualmente
                                                </label>
                                            </div>
                                        </div>
                                    </Row>
                                </ExperienceCard>
                            );
                        })}
                        <Button type="button" variant="outline" fullWidth
                                onClick={() => controller.actions.appendEducation({institution: '', degree: '', fieldOfStudy: '', graduationDate: '', isStudying: false})}>
                            + Adicionar Formação
                        </Button>
                    </Section>

                    <Divider/>

                    <Section id="schooling">
                        <Title>Escolaridade (Ensino Médio/Fundamental) (Opcional)</Title>
                        {controller.states.schoolingFields.map((field, index) => (
                            <ExperienceCard key={field.id}>
                                <RemoveButton type="button" onClick={() => controller.actions.removeSchooling(index)}>
                                    Remover
                                </RemoveButton>
                                <Row>
                                    <Input label="Instituição"
                                           placeholder="Ex: Escola Estadual..." {...controller.actions.register(`schooling.${index}.institution`)}
                                           error={controller.states.errors.schooling?.[index]?.institution?.message}/>
                                    <Input label="Grau/Nível"
                                           placeholder="Ex: Ensino Médio Completo" {...controller.actions.register(`schooling.${index}.degree`)}
                                           error={controller.states.errors.schooling?.[index]?.degree?.message}/>
                                </Row>
                                <Row>
                                    <Input label="Data de Conclusão (MM/AAAA)"
                                           placeholder="MM/AAAA"
                                           {...controller.actions.register(`schooling.${index}.completionDate`)}
                                           onChange={(e) => controller.actions.handleDateChange(e, `schooling.${index}.completionDate`)}
                                           error={controller.states.errors.schooling?.[index]?.completionDate?.message}/>
                                </Row>
                            </ExperienceCard>
                        ))}
                        <Button type="button" variant="outline" fullWidth
                                onClick={() => controller.actions.appendSchooling({institution: '', degree: '', completionDate: ''})}>
                            + Adicionar Escolaridade
                        </Button>
                    </Section>

                    <Divider/>

                    <Section id="courses">
                        <Title>Cursos Complementares (Opcional)</Title>
                        {controller.states.courseFields.map((field, index) => (
                            <ExperienceCard key={field.id}>
                                <RemoveButton type="button" onClick={() => controller.actions.removeCourse(index)}>
                                    Remover
                                </RemoveButton>
                                <Row>
                                    <Input label="Nome do Curso"
                                           placeholder="Ex: Excel Avançado" {...controller.actions.register(`courses.${index}.name`)}
                                           error={controller.states.errors.courses?.[index]?.name?.message}/>
                                    <Input label="Instituição"
                                           placeholder="Ex: Udemy" {...controller.actions.register(`courses.${index}.institution`)}
                                           error={controller.states.errors.courses?.[index]?.institution?.message}/>
                                </Row>
                                <Row>
                                    <Input label="Carga Horária (Opcional)"
                                           placeholder="Ex: 40h" {...controller.actions.register(`courses.${index}.duration`)}
                                           error={controller.states.errors.courses?.[index]?.duration?.message}/>
                                </Row>
                            </ExperienceCard>
                        ))}
                        <Button type="button" variant="outline" fullWidth
                                onClick={() => controller.actions.appendCourse({name: '', institution: '', duration: ''})}>
                            + Adicionar Curso
                        </Button>
                    </Section>

                    <Divider/>

                    <Section id="template">
                        <Title>Escolha o Modelo</Title>
                        <TemplateGrid>
                            {TEMPLATE_NAMES.map((template) => (
                                <TemplateCard
                                    key={template.id}
                                    $selected={controller.states.selectedTemplate === template.id}
                                    onClick={() => controller.actions.setTemplate(template.id)}
                                >
                                    <TemplateMiniature onClick={(e) => openPreview(template.id, e)} style={{cursor: 'zoom-in', pointerEvents: 'auto'}}>
                                        {RenderTemplatePreview(template.id)}
                                    </TemplateMiniature>
                                    <h3>{template.name}</h3>
                                </TemplateCard>
                            ))}
                        </TemplateGrid>
                    </Section>

                    <SubmitButtonContainer>
                        <Button type="submit" style={{fontSize: '16px', padding: '16px 48px'}}>
                            Gerar Currículo
                        </Button>
                    </SubmitButtonContainer>
                </form>
            </MainContent>

            {previewTemplateId && (
                <ModalOverlay onClick={closePreview}>
                    <ModalContent onClick={e => e.stopPropagation()}>
                        <CloseButton onClick={closePreview}>×</CloseButton>
                        <PreviewContainer $scale={scale}>
                            {RenderTemplatePreview(previewTemplateId)}
                        </PreviewContainer>
                    </ModalContent>
                </ModalOverlay>
            )}
        </Container>
    );
};