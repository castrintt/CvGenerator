import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    display: flex;
    height: 100%;
    font-family: 'Georgia', serif;
`;

const Sidebar = styled.div`
    width: 30%;
    background-color: #2c3e50;
    color: white;
    padding: 30px 20px;
    display: flex;
    flex-direction: column;
`;

const Main = styled.div`
    width: 70%;
    padding: 40px;
    background-color: white;
`;

const Name = styled.h1`
    font-size: 28px;
    margin: 0 0 20px 0;
    line-height: 1.2;
`;

const SidebarSection = styled.div`
    margin-bottom: 30px;
`;

const SidebarTitle = styled.h3`
    font-size: 16px;
    text-transform: uppercase;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 10px;
    margin-bottom: 15px;
    letter-spacing: 1px;
`;

const ContactItem = styled.div`
    font-size: 13px;
    margin-bottom: 10px;
    word-break: break-word;
`;

const SkillItem = styled.div`
    margin-bottom: 10px;
`;

const SkillName = styled.div`
    font-size: 14px;
    margin-bottom: 5px;
`;

const ProgressBar = styled.div`
    height: 4px;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
`;

const Progress = styled.div<{ width: string }>`
    height: 100%;
    background-color: #3498db;
    width: ${props => props.width};
    border-radius: 2px;
`;

const MainSection = styled.section`
    margin-bottom: 30px;
`;

const MainTitle = styled.h2`
    font-size: 20px;
    color: #2c3e50;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
    text-transform: uppercase;
`;

const ExperienceItem = styled.div`
    margin-bottom: 20px;
`;

const JobTitle = styled.h3`
    font-size: 18px;
    margin: 0 0 5px 0;
    color: #2c3e50;
`;

const Company = styled.div`
    font-weight: bold;
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 5px;
`;

const Date = styled.div`
    font-size: 13px;
    color: #95a5a6;
    margin-bottom: 10px;
    font-style: italic;
`;

const Description = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #34495e;
    margin: 0;
`;

export const ModernSidebarTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    const getSkillWidth = (level: string) => {
        switch (level) {
            case 'Iniciante':
                return '25%';
            case 'Intermediário':
                return '50%';
            case 'Avançado':
                return '75%';
            case 'Especialista':
                return '100%';
            default:
                return '50%';
        }
    };

    return (
        <Container>
            <Sidebar>
                <Name>{data.personalInfo.fullName}</Name>

                <SidebarSection>
                    <SidebarTitle>Contato</SidebarTitle>
                    <ContactItem>{data.personalInfo.email}</ContactItem>
                    <ContactItem>{data.personalInfo.phone}</ContactItem>
                    <ContactItem>{data.personalInfo.address}</ContactItem>
                    {data.personalInfo.linkedin && <ContactItem>{data.personalInfo.linkedin}</ContactItem>}
                    {data.personalInfo.website && <ContactItem>{data.personalInfo.website}</ContactItem>}
                </SidebarSection>

                <SidebarSection>
                    <SidebarTitle>Habilidades</SidebarTitle>
                    {data.skills.map((skill, index) => (
                        <SkillItem key={index}>
                            <SkillName>{skill.name}</SkillName>
                            <ProgressBar>
                                <Progress width={getSkillWidth(skill.level)}/>
                            </ProgressBar>
                        </SkillItem>
                    ))}
                </SidebarSection>
            </Sidebar>

            <Main>
                <MainSection>
                    <MainTitle>Perfil</MainTitle>
                    <Description>{data.summary}</Description>
                </MainSection>

                <MainSection>
                    <MainTitle>Experiência</MainTitle>
                    {data.experience.map((exp, index) => (
                        <ExperienceItem key={index}>
                            <JobTitle>{exp.position}</JobTitle>
                            <Company>{exp.company}</Company>
                            <Date>{exp.startDate} - {exp.endDate === "" ? "Atualmente" : exp.endDate}</Date>
                            <Description>{exp.description}</Description>
                        </ExperienceItem>
                    ))}
                </MainSection>

                <MainSection>
                    <MainTitle>Educação</MainTitle>
                    {data.education.map((edu, index) => (
                        <ExperienceItem key={index}>
                            <JobTitle>{edu.institution}</JobTitle>
                            <Company>{edu.degree} em {edu.fieldOfStudy}</Company>
                            <Date>{edu.graduationDate === "" ? "Cursando": edu.graduationDate}</Date>
                        </ExperienceItem>
                    ))}
                </MainSection>
            </Main>
        </Container>
    );
};