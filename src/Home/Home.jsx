import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

const BlocksGrid = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 900px;
  margin-top: 40px;

  @media (max-width: 900px) {
    gap: 24px;
    flex-wrap: wrap;
  }
  @media (max-width: 600px) {
    flex-direction: column;
    gap: 18px;
    margin-top: 24px;
  }
`;

const Block = styled.button`
  width: 260px;
  height: 180px;
  background: linear-gradient(120deg, #fff 60%, #e3f0ff 100%);
  border: none;
  border-radius: 22px;
  box-shadow: 0 6px 24px rgba(25, 118, 210, 0.13), 0 1.5px 4px rgba(0,0,0,0.04);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  color: #1976d2;
  cursor: pointer;
  transition: background 0.18s, transform 0.18s, box-shadow 0.18s;
  outline: none;
  border-bottom: 3px solid #e3f0ff;
  letter-spacing: 1.5px;

  &:hover, &:focus {
    background: linear-gradient(120deg, #e3f0ff 60%, #fff 100%);
    transform: translateY(-8px) scale(1.04);
    box-shadow: 0 10px 32px rgba(25, 118, 210, 0.18), 0 2px 8px rgba(0,0,0,0.06);
    color: #174ea6;
  }

  @media (max-width: 600px) {
    width: 96vw;
    min-width: 0;
    height: 110px;
    font-size: 1.3rem;
    padding: 0 8px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 900;
  color: #174ea6;
  margin-bottom: 18px;
  text-align: center;
  letter-spacing: 2px;
  text-shadow: 0 2px 8px rgba(25, 118, 210, 0.08);
`;



const Home = () => {
  const [showHome, setShowHome] = useState(false);
  const [selectedExam, setSelectedExam] = useState('');
  const navigate = useNavigate();
  const handleBlockClick = (block) => {
      setSelectedExam(block); 
      setShowHome(true);
  };
  if (showHome) {
    const x = selectedExam.toLowerCase();
    navigate(`/${x}`);
  }

  return (
    <Container>
      <Title>Select Your Exam</Title>
      <BlocksGrid>
        <Block onClick={() => handleBlockClick('JEE')}>JEE</Block>
        <Block onClick={() => handleBlockClick('NEET')}>NEET</Block>
        <Block onClick={() => handleBlockClick('UPSC')}>UPSC</Block>
      </BlocksGrid>
    </Container>
  );
};

export default Home;