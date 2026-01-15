import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
    font-family: 'Roboto Mono', monospace;
    color: #c9d1d9;
    background-color: #0d1117;
    width: 210mm;
    min-height: 297mm;
    padding: 40px;
    display: flex;
    flex-direction: column;
    overflow-wrap: break-word;
`;

const Header = styled.header`
    border-bottom: 1px solid #30363d;
    padding-bottom: 20px;
    margin-bottom: 30px;
`;

const Name = styled.h1`
    font-size: 32px;
    margin: 0 0 10px 0;
    color: #58a6ff;
`;

const ContactInfo = styled.div`
    font-size: 14px;
    color: #8b949e;
    display: flex;
    gap: 20px;
`;

const Section = styled.section`
    margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
    font-size: 18px;
    color: #ff7b72;
    margin-bottom: 15px;
    font-weight: bold;
    
    &:before {
        content: '> ';
        color: #8b949e;
    }
`;

const CodeBlock = styled.div`
    background-color: #161b22;
    border: 1px solid #30363d;
    border-radius: 6px;
    padding: 15px;
    margin-bottom: 15px;
`;

const Comment = styled.span`
    color: #8b949e;
    font-style: italic;
`;

const Keyword = styled.span`
    color: #ff7b72;
`;

const String = styled.span`
    color: #a5d6ff;
`;

const Variable = styled.span`
    color: #79c0ff;
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

export const TechTemplate: React.FC<{ data: ResumeData }> = ({data}) => {
    return (
        <Container>
            <Header>
                <Name>{`<${data.personalInfo.fullName} />`}</Name>
                <ContactInfo>
                    <span>{data.personalInfo.email}</span>
                    <span>{data.personalInfo.phone}</span>
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                </ContactInfo>
            </Header>

            <Section>
                <SectionTitle>const summary =</SectionTitle>
                <CodeBlock>
                    <String>"{data.summary}"</String>;
                </CodeBlock>
            </Section>

            {data.experience && data.experience.length > 0 && (
                <Section>
                    <SectionTitle>function experience()</SectionTitle>
                    {data.experience.map((exp, index) => (
                        <CodeBlock key={index}>
                            <Comment>// {formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}</Comment>
                            <div>
                                <Keyword>const</Keyword> <Variable>job</Variable> = {'{'}
                            </div>
                            <div style={{paddingLeft: '20px'}}>
                                role: <String>"{exp.position}"</String>,
                            </div>
                            <div style={{paddingLeft: '20px'}}>
                                company: <String>"{exp.company}"</String>,
                            </div>
                            <div style={{paddingLeft: '20px'}}>
                                description: <String>"{exp.description}"</String>
                            </div>
                            <div>{'}'};</div>
                        </CodeBlock>
                    ))}
                </Section>
            )}

            {data.education && data.education.length > 0 && (
                <Section>
                    <SectionTitle>const education = [...]</SectionTitle>
                    {data.education.map((edu, index) => (
                        <CodeBlock key={index}>
                            <div>{'{'}</div>
                            <div style={{paddingLeft: '20px'}}>
                                institution: <String>"{edu.institution}"</String>,
                            </div>
                            <div style={{paddingLeft: '20px'}}>
                                degree: <String>"{edu.degree}"</String>,
                            </div>
                            <div style={{paddingLeft: '20px'}}>
                                field: <String>"{edu.fieldOfStudy}"</String>
                            </div>
                            <div>{'}'},</div>
                        </CodeBlock>
                    ))}
                </Section>
            )}

            {data.courses && data.courses.length > 0 && (
                <Section>
                    <SectionTitle>const courses = [...]</SectionTitle>
                    <CodeBlock>
                        [
                        {data.courses.map((course, index) => (
                            <div key={index} style={{paddingLeft: '20px'}}>
                                <String>"{course.name}"</String> <Comment>// {course.institution}</Comment>
                                {index < data.courses.length - 1 ? ',' : ''}
                            </div>
                        ))}
                        ]
                    </CodeBlock>
                </Section>
            )}
        </Container>
    );
};