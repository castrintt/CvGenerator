import React from 'react';
import {Container, Divider, ExperienceCard, Header, MainContent, RemoveButton, Row, Section, Select, Sidebar, Step, StepIndicator, SubmitButtonContainer, TemplateCard, TemplateGrid, TemplatePreview, TextArea, Title} from './FormScreen.styles';
import {Input} from '../../components/Input/Input';
import {Button} from '../../components/Button/Button';
import type {FormScreenComponentProps} from "./FormScreen.types.ts";

const TEMPLATE_IMAGES = {
    1: "https://placehold.co/400x600/FFFFFF/333333?text=Classico&font=lora",
    2: "https://placehold.co/400x600/2c3e50/FFFFFF?text=Moderno+Lateral&font=lato",
    3: "https://placehold.co/400x600/F5F5F5/333333?text=Minimalista&font=roboto",
    4: "https://placehold.co/400x600/FFF8E1/333333?text=Tradicional&font=playfair-display",
    5: "https://placehold.co/400x600/6c5ce7/FFFFFF?text=Criativo&font=montserrat"
};

const TEMPLATE_NAMES = [
    {id: 1, name: "Clássico", image: TEMPLATE_IMAGES[1]},
    {id: 2, name: "Moderno Lateral", image: TEMPLATE_IMAGES[2]},
    {id: 3, name: "Minimalista", image: TEMPLATE_IMAGES[3]},
    {id: 4, name: "Tradicional", image: TEMPLATE_IMAGES[4]},
    {id: 5, name: "Criativo", image: TEMPLATE_IMAGES[5]}
];

export const FormScreenComponent: React.FC<FormScreenComponentProps> = ({controller}) => {
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
                    <Step $active={controller.states.activeSection === 'skills'}
                          onClick={() => controller.actions.scrollToSection('skills')}>
                        <span>5</span> Habilidades
                    </Step>
                    <Step $active={controller.states.activeSection === 'template'}
                          onClick={() => controller.actions.scrollToSection('template')}>
                        <span>6</span> Modelo
                    </Step>
                </StepIndicator>
            </Sidebar>

            <MainContent>
                <Header>
                    <h1>Crie seu Currículo Profissional</h1>
                    <p>Preencha os campos abaixo para gerar um currículo de alta qualidade em minutos.</p>
                </Header>

                <form onSubmit={controller.actions.handleSubmit}>
                    <Section id="personal">
                        <Title>Informações Pessoais</Title>
                        <Row>
                            <Input label="Nome Completo"
                                   placeholder="Ex: João Silva" {...controller.actions.register('personalInfo.fullName')}
                                   error={controller.states.errors.personalInfo?.fullName?.message}/>
                            <Input label="E-mail" placeholder="Ex: joao@email.com"
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
                                   placeholder="Ex: São Paulo, SP" {...controller.actions.register('personalInfo.address')}
                                   error={controller.states.errors.personalInfo?.address?.message}/>
                        </Row>
                        <Row>
                            <Input label="LinkedIn (Opcional)"
                                   placeholder="linkedin.com/in/joaosilva" {...controller.actions.register('personalInfo.linkedin')} />
                            <Input label="Site (Opcional)"
                                   placeholder="seusite.com" {...controller.actions.register('personalInfo.website')} />
                        </Row>
                    </Section>

                    <Divider/>

                    <Section id="summary">
                        <Title>Resumo Profissional</Title>
                        <TextArea
                            placeholder="Escreva um breve resumo sobre sua trajetória profissional, destacando suas principais conquistas e objetivos..."
                            {...controller.actions.register('summary')}
                        />
                        {controller.states.errors.summary &&
                         <span
                             style={{color: '#EB5757', fontSize: '12px'}}>{controller.states.errors.summary.message}</span>}
                    </Section>

                    <Divider/>

                    <Section id="experience">
                        <Title>Experiência Profissional</Title>
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
                                               placeholder="Ex: Google" {...controller.actions.register(`experience.${index}.company`)}
                                               error={controller.states.errors.experience?.[index]?.company?.message}/>
                                        <Input label="Cargo"
                                               placeholder="Ex: Engenheiro de Software" {...controller.actions.register(`experience.${index}.position`)}
                                               error={controller.states.errors.experience?.[index]?.position?.message}/>
                                    </Row>
                                    <Row>
                                        <Input label="Data de Início"
                                               type="date" {...controller.actions.register(`experience.${index}.startDate`)}
                                               error={controller.states.errors.experience?.[index]?.startDate?.message}/>

                                        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                            {!isCurrent && (
                                                <Input label="Data de Término"
                                                       type="date" {...controller.actions.register(`experience.${index}.endDate`)}
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
                                        placeholder="Descreva suas principais responsabilidades e conquistas..."
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
                        <Title>Formação Acadêmica</Title>
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
                                               placeholder="Ex: USP" {...controller.actions.register(`education.${index}.institution`)}
                                               error={controller.states.errors.education?.[index]?.institution?.message}/>
                                        <Input label="Grau"
                                               placeholder="Ex: Bacharelado" {...controller.actions.register(`education.${index}.degree`)}
                                               error={controller.states.errors.education?.[index]?.degree?.message}/>
                                    </Row>
                                    <Row>
                                        <Input label="Área de Estudo"
                                               placeholder="Ex: Ciência da Computação" {...controller.actions.register(`education.${index}.fieldOfStudy`)}
                                               error={controller.states.errors.education?.[index]?.fieldOfStudy?.message}/>

                                        <div style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
                                            {!isStudying && (
                                                <Input label="Data de Graduação"
                                                       type="date" {...controller.actions.register(`education.${index}.graduationDate`)}
                                                       error={controller.states.errors.education?.[index]?.graduationDate?.message}/>
                                            )}
                                            <div
                                                style={{display: 'flex', alignItems: 'center', marginTop: isStudying ? '30px' : '0'}}>
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

                    <Section id="skills">
                        <Title>Habilidades</Title>
                        {controller.states.skillFields.map((field, index) => (
                            <div key={field.id}
                                 style={{marginBottom: '16px', display: 'flex', gap: '16px', alignItems: 'flex-start'}}>
                                <div style={{flex: 2}}>
                                    <Input label="Habilidade"
                                           placeholder="Ex: React" {...controller.actions.register(`skills.${index}.name`)}
                                           error={controller.states.errors.skills?.[index]?.name?.message}/>
                                </div>
                                <div style={{flex: 1}}>
                                    <label
                                        style={{display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500}}>Nível</label>
                                    <Select {...controller.actions.register(`skills.${index}.level`)}>
                                        <option value="Iniciante">Iniciante</option>
                                        <option value="Intermediário">Intermediário</option>
                                        <option value="Avançado">Avançado</option>
                                        <option value="Especialista">Especialista</option>
                                    </Select>
                                </div>
                                <Button type="button" variant="outline"
                                        onClick={() => controller.actions.removeSkill(index)}
                                        style={{marginTop: '28px', padding: '10px 16px', borderColor: '#EB5757', color: '#EB5757'}}>
                                    ✕
                                </Button>
                            </div>
                        ))}
                        <Button type="button" variant="outline" fullWidth
                                onClick={() => controller.actions.appendSkill({name: '', level: 'Intermediário'})}>
                            + Adicionar Habilidade
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
                                    <TemplatePreview $image={template.image}/>
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
        </Container>
    );
};