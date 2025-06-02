import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { Context } from '../../context/context';
import SubjectsUPSC from './SubjectsUPSC';
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

const DoubtsUPSC = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
  };

  return (
    <AppContainer>
      {!selectedSubject && (
        <>
          <Title>Select a UPSC Subject to Ask Your Doubt</Title>
          <SubjectsUPSC onSelectSubject={handleSubjectSelect} />
        </>
      )}
      {selectedSubject && (
        <>
          <Title>
            {selectedSubject} — Ask Your Doubt
          </Title>
          <DoubtSolver subject={selectedSubject} examType="UPSC" />
        </>
      )}
    </AppContainer>
  );
};

export default DoubtsUPSC;