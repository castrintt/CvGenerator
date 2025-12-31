import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    padding: 40px;
    font-family: 'Roboto', sans-serif;
    color: #333;
    background-color: #fff;
    border-top: 10px solid #6c5ce7;
`;

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 40px;
`;

const NameSection = styled.div``;

const Name = styled.h1`
    font-size: 36px;
    margin: 0;
    color: #2d3436;
    font-weight: 700;
`;

const Title = styled.div`
    font-size: 18px;
    color: #6c5ce7;
    margin-top: 5px;
    font-weight: 500;
`;

const ContactSection = styled.div`
    text-align: right;
    font-size: 13px;
    color: #636e72;
`;

const ContactItem = styled.div`
    margin-bottom: 5px;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
`;

const FullWidth = styled.div`
    grid-column: 1 / -1;
    margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
    font-size: 16px;
    color: #2d3436;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 2px solid #dfe6e9;
    padding-bottom: 10px;
    margin-bottom: 20px;
`;

const ExperienceItem = styled.div`
    margin-bottom: 20px;
`;

const JobHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const JobTitle = styled.h3`
    font-size: 16px;
    margin: 0;
    color: #2d3436;
`;

const JobDate = styled.span`
    font-size: 13px;
    color: #6c5ce7;
    font-weight: 500;
`;

const Company = styled.div`
    font-size: 14px;
    color: #636e72;
    margin-bottom: 8px;
    font-weight: 500;
`;

const Description = styled.p`
    font-size: 13px;
    line-height: 1.6;
    color: #636e72;
    margin: 0;
`;

const SkillTag = styled.span`
    display: inline-block;
    background-color: #dfe6e9;
    color: #2d3436;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    margin-right: 8px;
    margin-bottom: 8px;
    font-weight: 500;
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

export const CreativeTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    const currentTitle = data.experience.length > 0 ? data.experience[0].position : '';

    return (
        <Container>
            <Header>
                <NameSection>
                    <Name>{data.personalInfo.fullName}</Name>
                    <Title>{currentTitle}</Title>
                </NameSection>
                <ContactSection>
                    <ContactItem>{data.personalInfo.email}</ContactItem>
                    <ContactItem>{data.personalInfo.phone}</ContactItem>
                    <ContactItem>{data.personalInfo.address}</ContactItem>
                    {data.personalInfo.linkedin && <ContactItem>{data.personalInfo.linkedin}</ContactItem>}
                </ContactSection>
            </Header>

            <FullWidth>
                <SectionTitle>Sobre Mim</SectionTitle>
                <Description>{data.summary}</Description>
            </FullWidth>

            <Grid>
                <div>
                    <SectionTitle>Experiência</SectionTitle>
                    {data.experience.map((exp, index) => (
                        <ExperienceItem key={index}>
                            <JobHeader>
                                <JobTitle>{exp.position}</JobTitle>
                                <JobDate>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Atualmente"}</JobDate>
                            </JobHeader>
                            <Company>{exp.company}</Company>
                            <Description>{exp.description}</Description>
                        </ExperienceItem>
                    ))}
                </div>

                <div>
                    <SectionTitle>Educação</SectionTitle>
                    {data.education.map((edu, index) => (
                        <ExperienceItem key={index}>
                            <JobHeader>
                                <JobTitle>{edu.institution}</JobTitle>
                                <JobDate>{edu.graduationDate ? formatDate(edu.graduationDate) : "Cursando"}</JobDate>
                            </JobHeader>
                            <Company>{edu.degree} em {edu.fieldOfStudy}</Company>
                        </ExperienceItem>
                    ))}

                    <div style={{marginTop: '30px'}}>
                        <SectionTitle>Habilidades</SectionTitle>
                        <div>
                            {data.skills.map((skill, index) => (
                                <SkillTag key={index}>{skill.name}</SkillTag>
                            ))}
                        </div>
                    </div>
                </div>
            </Grid>
        </Container>
    );
};