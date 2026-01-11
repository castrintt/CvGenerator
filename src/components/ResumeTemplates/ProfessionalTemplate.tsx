import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    font-family: 'Arial', sans-serif;
    color: #333;
    background-color: white;
    height: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.header`
    background-color: #2c3e50;
    color: white;
    padding: 30px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const HeaderLeft = styled.div``;

const Name = styled.h1`
    font-size: 32px;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
`;

const HeaderRight = styled.div`
    text-align: right;
    font-size: 13px;
    line-height: 1.5;
`;

const MainContent = styled.div`
    display: flex;
    flex: 1;
    padding: 40px;
    gap: 40px;
`;

const LeftColumn = styled.div`
    flex: 2;
`;

const RightColumn = styled.div`
    flex: 1;
    border-left: 1px solid #eee;
    padding-left: 40px;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    color: #2c3e50;
    text-transform: uppercase;
    border-bottom: 2px solid #3498db;
    padding-bottom: 10px;
    margin-bottom: 20px;
    margin-top: 0;
`;

const ExperienceItem = styled.div`
    margin-bottom: 25px;
`;

const JobTitle = styled.h3`
    font-size: 16px;
    margin: 0 0 5px 0;
    color: #2c3e50;
    font-weight: bold;
`;

const CompanyInfo = styled.div`
    font-size: 14px;
    color: #7f8c8d;
    margin-bottom: 8px;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
`;

const Description = styled.p`
    font-size: 14px;
    line-height: 1.6;
    color: #555;
    margin: 0;
    text-align: justify;
`;

const SkillItem = styled.div`
    margin-bottom: 15px;
`;

const SkillName = styled.div`
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 5px;
`;

const SkillLevel = styled.div`
    background-color: #ecf0f1;
    height: 6px;
    border-radius: 3px;
    overflow: hidden;
`;

const SkillFill = styled.div<{ width: string }>`
    background-color: #3498db;
    height: 100%;
    width: ${props => props.width};
`;

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    if (dateString.match(/^\d{2}\/\d{4}$/)) return dateString;
    
    const parts = dateString.split('-');
    if (parts.length === 2) {
        const [year, month] = parts;
        return `${month}/${year}`;
    }
    
    return dateString;
};

const getSkillWidth = (level: string) => {
    switch (level) {
        case 'Iniciante': return '25%';
        case 'Intermediário': return '50%';
        case 'Avançado': return '75%';
        case 'Especialista': return '100%';
        default: return '50%';
    }
};

export const ProfessionalTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    return (
        <Container>
            <Header>
                <HeaderLeft>
                    <Name>{data.personalInfo.fullName}</Name>
                </HeaderLeft>
                <HeaderRight>
                    <div>{data.personalInfo.email}</div>
                    <div>{data.personalInfo.phone}</div>
                    <div>{data.personalInfo.address}</div>
                    {data.personalInfo.linkedin && <div>{data.personalInfo.linkedin}</div>}
                </HeaderRight>
            </Header>

            <MainContent>
                <LeftColumn>
                    <SectionTitle>Resumo Profissional</SectionTitle>
                    <Description style={{marginBottom: '30px'}}>{data.summary}</Description>

                    <SectionTitle>Experiência Profissional</SectionTitle>
                    {data.experience.map((exp, index) => (
                        <ExperienceItem key={index}>
                            <JobTitle>{exp.position}</JobTitle>
                            <CompanyInfo>
                                <span>{exp.company}</span>
                                <span>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Atualmente"}</span>
                            </CompanyInfo>
                            <Description>{exp.description}</Description>
                        </ExperienceItem>
                    ))}
                </LeftColumn>

                <RightColumn>
                    <SectionTitle>Educação</SectionTitle>
                    {data.education.map((edu, index) => (
                        <ExperienceItem key={index}>
                            <JobTitle>{edu.institution}</JobTitle>
                            <CompanyInfo style={{flexDirection: 'column'}}>
                                <span>{edu.degree}</span>
                                <span style={{fontWeight: 'normal', fontSize: '13px'}}>{edu.fieldOfStudy}</span>
                                <span style={{fontWeight: 'normal', fontSize: '12px', marginTop: '4px'}}>
                                    {edu.graduationDate ? `Conclusão: ${formatDate(edu.graduationDate)}` : "Cursando"}
                                </span>
                            </CompanyInfo>
                        </ExperienceItem>
                    ))}

                    <SectionTitle>Habilidades</SectionTitle>
                    {data.skills.map((skill, index) => (
                        <SkillItem key={index}>
                            <SkillName>{skill.name}</SkillName>
                            <SkillLevel>
                                <SkillFill width={getSkillWidth(skill.level)} />
                            </SkillLevel>
                        </SkillItem>
                    ))}
                </RightColumn>
            </MainContent>
        </Container>
    );
};