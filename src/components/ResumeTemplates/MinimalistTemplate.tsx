import React from 'react';
import styled from 'styled-components';
import type {ResumeData} from "../../../business/domain/models/curriculum.model.ts";

const Container = styled.div`
  padding: 40px;
  font-family: 'Arial', sans-serif;
  color: #333;
  background: #fff;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 40px;
`;

const Name = styled.h1`
  font-size: 42px;
  margin: 0 0 15px 0;
  color: #2c3e50;
  font-weight: 300;
`;

const ContactInfo = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  font-size: 14px;
  color: #7f8c8d;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
`;

const LeftColumn = styled.div``;
const RightColumn = styled.div``;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 18px;
  color: #e74c3c;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 20px;
  font-weight: bold;
`;

const Item = styled.div`
  margin-bottom: 20px;
  position: relative;
  padding-left: 20px;
  border-left: 2px solid #eee;
  
  &:before {
    content: '';
    position: absolute;
    left: -6px;
    top: 0;
    width: 10px;
    height: 10px;
    background: #e74c3c;
    border-radius: 50%;
  }
`;

const ItemTitle = styled.h3`
  font-size: 16px;
  margin: 0 0 5px 0;
  color: #333;
`;

const ItemSubtitle = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: #555;
  margin-bottom: 5px;
`;

const Date = styled.div`
  font-size: 12px;
  color: #999;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: #666;
  margin: 0;
`;

const SkillTag = styled.div`
    background: #f8f9fa;
    padding: 8px 12px;
    margin-bottom: 8px;
    border-radius: 4px;
    font-size: 14px;
    border-left: 3px solid #e74c3c;
`;

export const MinimalistTemplate: React.FC<{ data: ResumeData }> = ({ data }) => {
  return (
    <Container>
      <Header>
        <Name>{data.personalInfo.fullName}</Name>
        <ContactInfo>
          <span>{data.personalInfo.email}</span>
          <span>•</span>
          <span>{data.personalInfo.phone}</span>
          <span>•</span>
          <span>{data.personalInfo.address}</span>
        </ContactInfo>
      </Header>

      <Content>
        <LeftColumn>
          <Section>
            <SectionTitle>Perfil</SectionTitle>
            <Description>{data.summary}</Description>
          </Section>

          <Section>
            <SectionTitle>Experiência</SectionTitle>
            {data.experience.map((exp, index) => (
              <Item key={index}>
                <ItemTitle>{exp.position}</ItemTitle>
                <ItemSubtitle>{exp.company}</ItemSubtitle>
                <Date>{exp.startDate} - {exp.endDate === "" ? "Atualmente" : exp.endDate}</Date>
                <Description>{exp.description}</Description>
              </Item>
            ))}
          </Section>
        </LeftColumn>

        <RightColumn>
          <Section>
            <SectionTitle>Educação</SectionTitle>
            {data.education.map((edu, index) => (
              <div key={index} style={{ marginBottom: '20px' }}>
                <ItemTitle>{edu.institution}</ItemTitle>
                <ItemSubtitle>{edu.degree}</ItemSubtitle>
                <Date>{edu.graduationDate === "" ? "Cursando": edu.graduationDate}</Date>
              </div>
            ))}
          </Section>

          <Section>
            <SectionTitle>Habilidades</SectionTitle>
            {data.skills.map((skill, index) => (
              <SkillTag key={index}>
                <strong>{skill.name}</strong>
                <div style={{ fontSize: '12px', color: '#888', marginTop: '2px' }}>{skill.level}</div>
              </SkillTag>
            ))}
          </Section>
        </RightColumn>
      </Content>
    </Container>
  );
};