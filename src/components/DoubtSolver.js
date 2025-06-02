import React, { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import styled, { keyframes } from 'styled-components';

const Card = styled.div`
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  padding: 28px 18px 22px 18px;
  max-width: 420px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 18px;
`;

const SubjectBadge = styled.span`
  display: inline-block;
  background: #e3f0ff;
  color: #1976d2;
  font-weight: 700;
  border-radius: 8px;
  padding: 4px 14px;
  font-size: 1rem;
  margin-bottom: 8px;
  text-transform: capitalize;
`;

const Title = styled.h2`
  color: #174ea6;
  font-size: 1.25rem;
  font-weight: 800;
  margin: 0 0 6px 0;
`;

const Subtitle = styled.p`
  color: #555;
  font-size: 1rem;
  margin: 0;
`;

const Form = styled.form`
  display: flex;
  gap: 10px;
  margin-bottom: 18px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1.5px solid #bdbdbd;
  font-size: 1rem;
  background: #fff;
  transition: border 0.2s;
  &:focus {
    border-color: #1976d2;
  }
`;

const Button = styled.button`
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0 18px;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  min-width: 90px;
  &:hover:enabled {
    background: #1565c0;
  }
  &:disabled {
    background: #bdbdbd;
    cursor: not-allowed;
  }
`;

const Result = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 14px 12px;
  min-height: 48px;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  word-break: break-word;
  overflow-wrap: break-word;
  max-height: 180px;
  overflow-y: auto;
`;

const LoaderAnim = keyframes`
  0% { opacity: 0.2; }
  50% { opacity: 1; }
  100% { opacity: 0.2; }
`;

const Loader = styled.span`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #1976d2;
  animation: ${LoaderAnim} 1s infinite;
`;

const LoadingText = styled.div`
  color: #1976d2;
  font-weight: 600;
  text-align: center;
  font-size: 1.05rem;
`;

const DoubtSolver = ({ subject, examType }) => {
  const {
    onSent1, onSent2, onSent3, onSent4,
    showResult, loading, resultData, setInput, input, setResultData
  } = useContext(Context);

  useEffect(() => {
    setInput('');
    setResultData('');
  }, [subject, setInput, setResultData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (subject === "Physics") {
      onSent2(input, examType);
    } else if (subject === "Chemistry") {
      onSent1(input, examType);
    } else if (subject === "Maths") {
      onSent3(input, examType);
    } else if (subject === "Biology") {
      onSent4(input, examType);
    }
  };

  return (
    <Card>
      <Header>
        <SubjectBadge>{subject}</SubjectBadge>
        <Title>{subject} Doubt Solver</Title>
        <Subtitle>Ask any question related to {subject} and get instant help!</Subtitle>
      </Header>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Type your doubt in ${subject}...`}
          autoFocus
        />
        <Button type="submit" disabled={loading || !input.trim()}>
          {loading ? <Loader /> : "Submit"}
        </Button>
      </Form>
      <Result>
        {loading ? (
          <LoadingText>Thinking...</LoadingText>
        ) : (
          resultData && <p dangerouslySetInnerHTML={{ __html: resultData }} />
        )}
      </Result>
    </Card>
  );
};

export default DoubtSolver;