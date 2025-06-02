import React from 'react';
import styled, { css } from 'styled-components';

const SubjectBoxesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
  justify-content: center;
  margin: 18px 0;
`;

const SubjectBox = styled.div`
  background: #f8fafc;
  border: 1.5px solid #1976d2;
  border-radius: 10px;
  padding: 10px 12px;
  min-width: 90px;
  min-height: 32px;
  max-width: 180px;
  font-size: 0.95rem;
  font-weight: 600;
  color: #1976d2;
  text-align: center;
  cursor: pointer;
  transition: background 0.18s, color 0.18s, box-shadow 0.18s;
  box-shadow: 0 2px 8px rgba(25, 118, 210, 0.07);

  &:hover {
    background: #e3f0ff;
    color: #174ea6;
    box-shadow: 0 4px 16px rgba(25, 118, 210, 0.13);
  }
`;

const upscSubjects = [
  "History",
  "Geography",
  "Indian Polity",
  "Indian Economy",
  "Environment & Ecology",
  "Science & Technology",
  "Ethics",
  "Current Affairs",
  "Quantitative Aptitude (CSAT)",
  "Logical Reasoning (CSAT)",
  "Reading Comprehension (CSAT)",
  "Essay Writing",
  "Interview / Personality Test"
];

const SubjectsUPSC = ({ onSelectSubject }) => (
  <SubjectBoxesWrapper>
    {upscSubjects.map((subject) => (
      <SubjectBox
        key={subject}
        onClick={() => onSelectSubject(subject)}
      >
        {subject}
      </SubjectBox>
    ))}
  </SubjectBoxesWrapper>
);

export default SubjectsUPSC;