import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    font-family: 'Georgia', serif;
    color: #444;
    background-color: #fffaf0;
    height: 100%;
    padding: 50px;
    border: 1px solid #e0e0e0;
`;

const Header = styled.header`
    text-align: center;
    border-bottom: 1px solid #d4af37;
    padding-bottom: 30px;
    margin-bottom: 40px;
`;

const Name = styled.h1`
    font-size: 38px;
    margin: 0 0 15px 0;
    color: #2c3e50;
    font-weight: normal;
    letter-spacing: 2px;
`;

const ContactInfo = styled.div`
    font-size: 14px;
    color: #7f8c8d;
    display: flex;
    justify-content: center;
    gap: 20px;
    font-style: italic;
`;

const Section = styled.section`
    margin-bottom: 35px;
`;

const SectionTitle = styled.h2`
    font-size: 20px;
    color: #d4af37;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 25px;
    font-weight: normal;
    position: relative;
    
    &:after {
        content: '';
        display: block;
        width: 40px;
        height: 2px;
        background-color: #d4af37;
        margin: 10px auto 0;
    }
`;

const ExperienceItem = styled.div`
    margin-bottom: 25px;
`;

const JobHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 8px;
`;

const JobTitle = styled.h3`
    font-size: 18px;
    margin: 0;
    color: #333;
    font-weight: bold;
`;

const Date = styled.span`
    font-size: 14px;
    color: #999;
    font-style: italic;
`;

const Company = styled.div`
    font-size: 15px;
    color: #666;
    margin-bottom: 10px;
    font-weight: 600;
`;

const Description = styled.p`
    font-size: 15px;
    line-height: 1.7;
    margin: 0;
    text-align: justify;
`;

const SkillsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
`;

const SkillTag = styled.span`
    border: 1px solid #d4af37;
    color: #555;
    padding: 6px 14px;
    font-size: 13px;
    border-radius: 20px;
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

export const ElegantTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    return (
        <Container>
            <Header>
                <Name>{data.personalInfo.fullName}</Name>
                <ContactInfo>
                    <span>{data.personalInfo.email}</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>{data.personalInfo.address}</span>
                </ContactInfo>
                {(data.personalInfo.linkedin || data.personalInfo.website) && (
                    <ContactInfo style={{marginTop: '5px'}}>
                        {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                        {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                    </ContactInfo>
                )}
            </Header>

            <Section>
                <SectionTitle>Perfil</SectionTitle>
                <Description style={{textAlign: 'center', maxWidth: '80%', margin: '0 auto'}}>
                    {data.summary}
                </Description>
            </Section>

            <Section>
                <SectionTitle>Experiência</SectionTitle>
                {data.experience.map((exp, index) => (
                    <ExperienceItem key={index}>
                        <JobHeader>
                            <JobTitle>{exp.position}</JobTitle>
                            <Date>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Atualmente"}</Date>
                        </JobHeader>
                        <Company>{exp.company}</Company>
                        <Description>{exp.description}</Description>
                    </ExperienceItem>
                ))}
            </Section>

            <Section>
                <SectionTitle>Formação</SectionTitle>
                {data.education.map((edu, index) => (
                    <ExperienceItem key={index} style={{textAlign: 'center'}}>
                        <JobTitle>{edu.institution}</JobTitle>
                        <Company>{edu.degree} em {edu.fieldOfStudy}</Company>
                        <Date>{edu.graduationDate ? `Conclusão: ${formatDate(edu.graduationDate)}` : "Cursando"}</Date>
                    </ExperienceItem>
                ))}
            </Section>

            <Section>
                <SectionTitle>Habilidades</SectionTitle>
                <SkillsContainer>
                    {data.skills.map((skill, index) => (
                        <SkillTag key={index}>{skill.name}</SkillTag>
                    ))}
                </SkillsContainer>
            </Section>
        </Container>
    );
};