import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    font-family: 'Roboto', 'Segoe UI', sans-serif;
    color: #e0e0e0;
    background-color: #1a1a1a;
    height: 100%;
    display: grid;
    grid-template-columns: 280px 1fr;
`;

const Sidebar = styled.div`
    background-color: #121212;
    padding: 40px 25px;
    border-right: 1px solid #333;
`;

const Main = styled.div`
    padding: 40px;
`;

const Name = styled.h1`
    font-size: 36px;
    color: #00d2d3; /* Cyan */
    margin: 0 0 5px 0;
    line-height: 1;
`;

const Role = styled.div`
    font-size: 16px;
    color: #888;
    margin-bottom: 30px;
`;

const SidebarSection = styled.div`
    margin-bottom: 40px;
`;

const SidebarTitle = styled.h3`
    font-size: 14px;
    color: #00d2d3;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    margin-bottom: 15px;
    font-weight: bold;
`;

const ContactItem = styled.div`
    font-size: 13px;
    margin-bottom: 12px;
    color: #bbb;
    word-break: break-all;
    
    span {
        display: block;
        color: #666;
        font-size: 11px;
        margin-bottom: 2px;
    }
`;

const SkillTag = styled.div`
    background-color: #333;
    color: #ddd;
    padding: 6px 10px;
    border-radius: 4px;
    font-size: 12px;
    margin-bottom: 8px;
    display: inline-block;
    margin-right: 8px;
    border-left: 3px solid #00d2d3;
`;

const MainSection = styled.section`
    margin-bottom: 40px;
`;

const MainTitle = styled.h2`
    font-size: 22px;
    color: #fff;
    border-bottom: 1px solid #333;
    padding-bottom: 10px;
    margin-bottom: 25px;
    
    span {
        color: #00d2d3;
    }
`;

const ExperienceItem = styled.div`
    margin-bottom: 30px;
    position: relative;
    padding-left: 20px;
    
    &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 6px;
        width: 8px;
        height: 8px;
        background-color: #00d2d3;
        border-radius: 50%;
    }
    
    &:after {
        content: '';
        position: absolute;
        left: 3px;
        top: 14px;
        bottom: -20px;
        width: 2px;
        background-color: #333;
    }
    
    &:last-child:after {
        display: none;
    }
`;

const JobTitle = styled.h3`
    font-size: 18px;
    margin: 0 0 5px 0;
    color: #fff;
`;

const CompanyDate = styled.div`
    font-size: 14px;
    color: #00d2d3;
    margin-bottom: 10px;
    font-family: 'Courier New', monospace;
`;

const Description = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #aaa;
    margin: 0;
`;

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    // Se a data já estiver no formato MM/AAAA, retorna ela mesma
    if (dateString.match(/^\d{2}\/\d{4}$/)) return dateString;
    
    // Caso contrário, tenta converter do formato YYYY-MM
    const parts = dateString.split('-');
    if (parts.length === 2) {
        const [year, month] = parts;
        return `${month}/${year}`;
    }
    
    return dateString;
};

export const TechTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    const currentRole = data.experience.length > 0 ? data.experience[0].position : 'Profissional';

    return (
        <Container>
            <Sidebar>
                <Name>{data.personalInfo.fullName.split(' ')[0]}</Name>
                <Name style={{fontSize: '24px', color: '#fff'}}>{data.personalInfo.fullName.split(' ').slice(1).join(' ')}</Name>
                <Role>{currentRole}</Role>

                <SidebarSection>
                    <SidebarTitle>Contato</SidebarTitle>
                    <ContactItem>
                        <span>Email</span>
                        {data.personalInfo.email}
                    </ContactItem>
                    <ContactItem>
                        <span>Telefone</span>
                        {data.personalInfo.phone}
                    </ContactItem>
                    <ContactItem>
                        <span>Localização</span>
                        {data.personalInfo.address}
                    </ContactItem>
                    {data.personalInfo.linkedin && (
                        <ContactItem>
                            <span>LinkedIn</span>
                            {data.personalInfo.linkedin}
                        </ContactItem>
                    )}
                </SidebarSection>

                <SidebarSection>
                    <SidebarTitle>Skills</SidebarTitle>
                    <div>
                        {data.skills.map((skill, index) => (
                            <SkillTag key={index}>{skill.name}</SkillTag>
                        ))}
                    </div>
                </SidebarSection>
            </Sidebar>

            <Main>
                <MainSection>
                    <MainTitle><span>//</span> Sobre</MainTitle>
                    <Description>{data.summary}</Description>
                </MainSection>

                <MainSection>
                    <MainTitle><span>//</span> Experiência</MainTitle>
                    {data.experience.map((exp, index) => (
                        <ExperienceItem key={index}>
                            <JobTitle>{exp.position}</JobTitle>
                            <CompanyDate>{exp.company} | {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Presente"}</CompanyDate>
                            <Description>{exp.description}</Description>
                        </ExperienceItem>
                    ))}
                </MainSection>

                <MainSection>
                    <MainTitle><span>//</span> Educação</MainTitle>
                    {data.education.map((edu, index) => (
                        <ExperienceItem key={index}>
                            <JobTitle>{edu.institution}</JobTitle>
                            <CompanyDate>{edu.degree} em {edu.fieldOfStudy}</CompanyDate>
                            <Description style={{color: '#00d2d3', fontSize: '13px'}}>
                                {edu.graduationDate ? `Conclusão: ${formatDate(edu.graduationDate)}` : "Em andamento"}
                            </Description>
                        </ExperienceItem>
                    ))}
                </MainSection>
            </Main>
        </Container>
    );
};