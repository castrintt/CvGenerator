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

            {data.experience && data.experience.length > 0 && (
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
            )}

            {data.education && data.education.length > 0 && (
                <Section>
                    <SectionTitle>Formação Acadêmica</SectionTitle>
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
            )}

            {data.schooling && data.schooling.length > 0 && (
                <Section>
                    <SectionTitle>Escolaridade</SectionTitle>
                    {data.schooling.map((sch: any, index: any) => (
                        <Item key={index}>
                            <ItemHeader>
                                <ItemTitle>{sch.institution}</ItemTitle>
                                <Date>{sch.completionDate ? formatDate(sch.completionDate) : ""}</Date>
                            </ItemHeader>
                            <ItemSubtitle>{sch.degree}</ItemSubtitle>
                        </Item>
                    ))}
                </Section>
            )}

            {data.courses && data.courses.length > 0 && (
                <Section>
                    <SectionTitle>Cursos Complementares</SectionTitle>
                    {data.courses.map((course: any, index: any) => (
                        <Item key={index}>
                            <ItemHeader>
                                <ItemTitle>{course.name}</ItemTitle>
                                {course.duration && <Date>{course.duration}</Date>}
                            </ItemHeader>
                            <ItemSubtitle>{course.institution}</ItemSubtitle>
                        </Item>
                    ))}
                </Section>
            )}
        </Container>
    );
};