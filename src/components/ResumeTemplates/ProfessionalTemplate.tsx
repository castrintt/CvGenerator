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
    color: white;
`;

const HeaderRight = styled.div`
    text-align: right;
    font-size: 13px;
    line-height: 1.5;
    color: white;
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

const CourseItem = styled.div`
    margin-bottom: 15px;
`;

const CourseName = styled.div`
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 2px;
`;

const CourseDetail = styled.div`
    font-size: 12px;
    color: #666;
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

                    {data.experience && data.experience.length > 0 && (
                        <>
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
                        </>
                    )}
                </LeftColumn>

                <RightColumn>
                    {data.education && data.education.length > 0 && (
                        <>
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
                        </>
                    )}

                    {data.schooling && data.schooling.length > 0 && (
                        <>
                            <SectionTitle>Escolaridade</SectionTitle>
                            {data.schooling.map((sch, index) => (
                                <ExperienceItem key={index}>
                                    <JobTitle>{sch.institution}</JobTitle>
                                    <CompanyInfo style={{flexDirection: 'column'}}>
                                        <span>{sch.degree}</span>
                                        <span style={{fontWeight: 'normal', fontSize: '12px', marginTop: '4px'}}>
                                            {sch.completionDate ? `Conclusão: ${formatDate(sch.completionDate)}` : ""}
                                        </span>
                                    </CompanyInfo>
                                </ExperienceItem>
                            ))}
                        </>
                    )}

                    {data.courses && data.courses.length > 0 && (
                        <>
                            <SectionTitle>Cursos</SectionTitle>
                            {data.courses.map((course, index) => (
                                <CourseItem key={index}>
                                    <CourseName>{course.name}</CourseName>
                                    <CourseDetail>{course.institution} {course.duration ? `• ${course.duration}` : ''}</CourseDetail>
                                </CourseItem>
                            ))}
                        </>
                    )}
                </RightColumn>
            </MainContent>
        </Container>
    );
};