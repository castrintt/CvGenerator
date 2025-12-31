import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    padding: 40px;
    font-family: 'Helvetica', sans-serif;
    color: #000;
    background-color: white;
`;

const Header = styled.header`
    border-bottom: 2px solid #000;
    padding-bottom: 20px;
    margin-bottom: 30px;
`;

const Name = styled.h1`
    font-size: 36px;
    margin: 0 0 10px 0;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #000;
`;

const ContactInfo = styled.div`
    font-size: 14px;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    color: #333;
`;

const Section = styled.section`
    margin-bottom: 25px;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    text-transform: uppercase;
    border-bottom: 1px solid #666;
    padding-bottom: 5px;
    margin-bottom: 15px;
    color: #000;
    font-weight: bold;
`;

const Item = styled.div`
    margin-bottom: 15px;
`;

const ItemHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
`;

const ItemTitle = styled.h3`
    font-size: 16px;
    margin: 0;
    font-weight: bold;
    color: #000;
`;

const ItemSubtitle = styled.div`
    font-size: 14px;
    font-style: italic;
    color: #333;
`;

const Date = styled.span`
    font-size: 14px;
    color: #333;
    font-weight: 500;
`;

const Description = styled.p`
    font-size: 14px;
    margin: 5px 0 0 0;
    line-height: 1.5;
    color: #000;
`;

const SkillsList = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const SkillTag = styled.span`
    background: #eee;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 12px;
    color: #000;
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

export const ClassicTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    return (
        <Container>
            <Header>
                <Name>{data.personalInfo.fullName}</Name>
                <ContactInfo>
                    <span>{data.personalInfo.email}</span>
                    <span>{data.personalInfo.phone}</span>
                    <span>{data.personalInfo.address}</span>
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                </ContactInfo>
            </Header>

            <Section>
                <SectionTitle>Resumo Profissional</SectionTitle>
                <Description>{data.summary}</Description>
            </Section>

            <Section>
                <SectionTitle>Experiência</SectionTitle>
                {data.experience.map((exp: any, index: any) => (
                    <Item key={index}>
                        <ItemHeader>
                            <ItemTitle>{exp.position}</ItemTitle>
                            <Date>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Atualmente"}</Date>
                        </ItemHeader>
                        <ItemSubtitle>{exp.company}</ItemSubtitle>
                        <Description>{exp.description}</Description>
                    </Item>
                ))}
            </Section>

            <Section>
                <SectionTitle>Educação</SectionTitle>
                {data.education.map((edu: any, index: any) => (
                    <Item key={index}>
                        <ItemHeader>
                            <ItemTitle>{edu.institution}</ItemTitle>
                            <Date>{edu.graduationDate ? formatDate(edu.graduationDate) : "Cursando"}</Date>
                        </ItemHeader>
                        <ItemSubtitle>{edu.degree} em {edu.fieldOfStudy}</ItemSubtitle>
                    </Item>
                ))}
            </Section>

            <Section>
                <SectionTitle>Habilidades</SectionTitle>
                <SkillsList>
                    {data.skills.map((skill: any, index: any) => (
                        <SkillTag key={index}>{skill.name} ({skill.level})</SkillTag>
                    ))}
                </SkillsList>
            </Section>
        </Container>
    );
};