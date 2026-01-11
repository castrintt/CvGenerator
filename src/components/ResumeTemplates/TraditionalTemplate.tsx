import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    padding: 0;
    font-family: 'Times New Roman', serif;
    color: #000;
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: white;
`;

const Header = styled.header`
    background-color: #f4f4f4;
    padding: 40px;
    text-align: center;
    border-bottom: 1px solid #000;
`;

const Name = styled.h1`
    font-size: 32px;
    margin: 0 0 10px 0;
    font-weight: bold;
    color: #000;
`;

const ContactInfo = styled.div`
    font-size: 14px;
    color: #000;
    font-weight: 500;
`;

const Main = styled.div`
    padding: 40px;
`;

const Section = styled.section`
    margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
    font-size: 16px;
    text-transform: uppercase;
    border-bottom: 1px solid #000;
    padding-bottom: 5px;
    margin-bottom: 15px;
    font-weight: bold;
    color: #000;
`;

const Item = styled.div`
    margin-bottom: 15px;
    display: flex;
`;

const Left = styled.div`
    width: 120px;
    font-size: 14px;
    font-weight: bold;
    flex-shrink: 0;
    color: #000;
`;

const Right = styled.div`
    flex-grow: 1;
`;

const ItemTitle = styled.h3`
    font-size: 16px;
    margin: 0 0 5px 0;
    font-weight: bold;
    color: #000;
`;

const ItemSubtitle = styled.div`
    font-size: 14px;
    font-style: italic;
    margin-bottom: 5px;
    color: #000;
`;

const Description = styled.p`
    font-size: 14px;
    margin: 0;
    line-height: 1.4;
    color: #000;
`;

const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const [year, month] = dateString.split('-');
    return `${month}/${year}`;
};

export const TraditionalTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    return (
        <Container>
            <Header>
                <Name>{data.personalInfo.fullName}</Name>
                <ContactInfo>
                    {data.personalInfo.address} | {data.personalInfo.phone} | {data.personalInfo.email}
                </ContactInfo>
            </Header>

            <Main>
                <Section>
                    <SectionTitle>Resumo</SectionTitle>
                    <Description>{data.summary}</Description>
                </Section>

                {data.experience && data.experience.length > 0 && (
                    <Section>
                        <SectionTitle>Experiência</SectionTitle>
                        {data.experience.map((exp, index) => (
                            <Item key={index}>
                                <Left>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Atualmente"}</Left>
                                <Right>
                                    <ItemTitle>{exp.position}</ItemTitle>
                                    <ItemSubtitle>{exp.company}</ItemSubtitle>
                                    <Description>{exp.description}</Description>
                                </Right>
                            </Item>
                        ))}
                    </Section>
                )}

                {data.education && data.education.length > 0 && (
                    <Section>
                        <SectionTitle>Educação</SectionTitle>
                        {data.education.map((edu, index) => (
                            <Item key={index}>
                                <Left>{edu.graduationDate ? formatDate(edu.graduationDate) : "Cursando"}</Left>
                                <Right>
                                    <ItemTitle>{edu.institution}</ItemTitle>
                                    <ItemSubtitle>{edu.degree} em {edu.fieldOfStudy}</ItemSubtitle>
                                </Right>
                            </Item>
                        ))}
                    </Section>
                )}

                {data.schooling && data.schooling.length > 0 && (
                    <Section>
                        <SectionTitle>Escolaridade</SectionTitle>
                        {data.schooling.map((sch, index) => (
                            <Item key={index}>
                                <Left>{sch.completionDate ? formatDate(sch.completionDate) : ""}</Left>
                                <Right>
                                    <ItemTitle>{sch.institution}</ItemTitle>
                                    <ItemSubtitle>{sch.degree}</ItemSubtitle>
                                </Right>
                            </Item>
                        ))}
                    </Section>
                )}

                {data.courses && data.courses.length > 0 && (
                    <Section>
                        <SectionTitle>Cursos Complementares</SectionTitle>
                        {data.courses.map((course, index) => (
                            <Item key={index}>
                                <Left>{course.duration || ""}</Left>
                                <Right>
                                    <ItemTitle>{course.name}</ItemTitle>
                                    <ItemSubtitle>{course.institution}</ItemSubtitle>
                                </Right>
                            </Item>
                        ))}
                    </Section>
                )}
            </Main>
        </Container>
    );
};