import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    display: flex;
    width: 210mm;
    min-height: 297mm;
    font-family: 'Georgia', serif;
    overflow-wrap: break-word;
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
    color: #333;
    display: flex;
    flex-direction: column;
`;

const Name = styled.h1`
    font-size: 28px;
    margin: 0 0 20px 0;
    line-height: 1.2;
    color: white;
    word-break: break-word;
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
    color: white;
`;

const ContactItem = styled.div`
    font-size: 13px;
    margin-bottom: 10px;
    word-break: break-word;
    color: white;
`;

const CourseItem = styled.div`
    margin-bottom: 15px;
`;

const CourseName = styled.div`
    font-size: 14px;
    font-weight: bold;
    color: white;
    margin-bottom: 2px;
`;

const CourseInstitution = styled.div`
    font-size: 12px;
    color: rgba(255, 255, 255, 0.7);
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

export const ModernSidebarTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
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

                {data.courses && data.courses.length > 0 && (
                    <SidebarSection>
                        <SidebarTitle>Cursos</SidebarTitle>
                        {data.courses.map((course, index) => (
                            <CourseItem key={index}>
                                <CourseName>{course.name}</CourseName>
                                <CourseInstitution>{course.institution} {course.duration ? `(${course.duration})` : ''}</CourseInstitution>
                            </CourseItem>
                        ))}
                    </SidebarSection>
                )}
            </Sidebar>

            <Main>
                <MainSection>
                    <MainTitle>Perfil</MainTitle>
                    <Description>{data.summary}</Description>
                </MainSection>

                {data.experience && data.experience.length > 0 && (
                    <MainSection>
                        <MainTitle>Experiência</MainTitle>
                        {data.experience.map((exp, index) => (
                            <ExperienceItem key={index}>
                                <JobTitle>{exp.position}</JobTitle>
                                <Company>{exp.company}</Company>
                                <Date>{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Atualmente"}</Date>
                                <Description>{exp.description}</Description>
                            </ExperienceItem>
                        ))}
                    </MainSection>
                )}

                {data.education && data.education.length > 0 && (
                    <MainSection>
                        <MainTitle>Formação Acadêmica</MainTitle>
                        {data.education.map((edu, index) => (
                            <ExperienceItem key={index}>
                                <JobTitle>{edu.institution}</JobTitle>
                                <Company>{edu.degree} em {edu.fieldOfStudy}</Company>
                                <Date>{edu.graduationDate ? formatDate(edu.graduationDate) : "Cursando"}</Date>
                            </ExperienceItem>
                        ))}
                    </MainSection>
                )}

                {data.schooling && data.schooling.length > 0 && (
                    <MainSection>
                        <MainTitle>Escolaridade</MainTitle>
                        {data.schooling.map((sch, index) => (
                            <ExperienceItem key={index}>
                                <JobTitle>{sch.institution}</JobTitle>
                                <Company>{sch.degree}</Company>
                                <Date>{sch.completionDate ? formatDate(sch.completionDate) : ""}</Date>
                            </ExperienceItem>
                        ))}
                    </MainSection>
                )}
                <div style={{flexGrow: 1}}></div>
            </Main>
        </Container>
    );
};