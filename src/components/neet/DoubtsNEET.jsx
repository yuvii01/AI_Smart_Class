import React, { useState } from 'react';
import styled from 'styled-components';
import DoubtSolver from '../DoubtSolver';

const AppContainer = styled.div`
  min-height: 400px;
  min-width: 320px;
  background: #f8fafc;
  border-radius: 18px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  padding: 32px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
`;

const Title = styled.h2`
  color: #1976d2;
  font-weight: 700;
  text-align: center;
  margin-bottom: 18px;
  font-size: 1.25rem;
`;

const neetSubjects = ["Physics", "Chemistry", "Biology"];

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
  padding: 14px 22px;
  min-width: 100px;
  min-height: 36px;
  font-size: 1.05rem;
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

const DoubtsNEET = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  return (
    <AppContainer>
      {!selectedSubject ? (
        <>
          <Title>Select a NEET Subject to Ask Your Doubt</Title>
          <SubjectBoxesWrapper>
            {neetSubjects.map(subject => (
              <SubjectBox key={subject} onClick={() => setSelectedSubject(subject)}>
                {subject}
              </SubjectBox>
            ))}
          </SubjectBoxesWrapper>
        </>
      ) : (
        <>
          <Title>{selectedSubject} — Ask Your Doubt</Title>
          <DoubtSolver subject={selectedSubject} examType="NEET" />
        </>
      )}
    </AppContainer>
  );
};

export default DoubtsNEET;