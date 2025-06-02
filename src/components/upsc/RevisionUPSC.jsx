import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import { Context } from '../../context/context';

const Container = styled.div`
  max-width: 400px;
  margin: 40px auto;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  padding: 32px 28px 24px 28px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  color: #1976d2;
  margin-bottom: 24px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
`;

const Select = styled.select`
  padding: 8px 12px;
  border-radius: 8px;
  border: 1.5px solid #bdbdbd;
  font-size: 1rem;
  background: #fff;
  transition: border 0.2s;
  &:focus {
    border-color: #1976d2;
  }
`;

const Input = styled.input`
  padding: 8px 12px;
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
  margin-top: 10px;
  background: #1976d2;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #1565c0;
  }
`;

const Result = styled.div`
  margin-top: 18px;
  background: #fff;
  border-radius: 8px;
  padding: 16px 14px;
  min-height: 48px;
  font-size: 1rem;
  color: #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.03);
  word-break: break-word;
  overflow-wrap: break-word;
`;

const Loading = styled.div`
  color: #1976d2;
  font-weight: 600;
  font-size: 1.1rem;
  text-align: center;
  min-height: 32px;
`;

const DownloadBtn = styled.button`
  margin-top: 16px;
  background: #43a047;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 0;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  &:hover {
    background: #2e7031;
  }
`;

// UPSC subjects only
const subjectOptions = [
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "polity", label: "Polity" },
  { value: "economics", label: "Economics" },
  { value: "science", label: "Science" },
  { value: "environment", label: "Environment" },
  { value: "current affairs", label: "Current Affairs" },
  { value: "all", label: "All Subjects" },
];

const RevisionUPSC = () => {
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

  const { onSent7, loading, resultData } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowResult(false);
    setCustomLoading(true);
    setLoadingStage(1);

    setTimeout(() => setLoadingStage(2), 6000);
    setTimeout(() => setLoadingStage(3), 11000);
    setTimeout(() => {
      setCustomLoading(false);
      setShowResult(true);
      onSent7("upsc", subject, topic);
    }, 16000);
  };

  // PDF download logic
  const handleDownloadPDF = () => {
    if (!resultData) return;
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'a4',
    });
    const margin = 40;
    const pageWidth = pdf.internal.pageSize.getWidth() - margin * 2;
    let y = margin;

    // Add heading
    pdf.setFontSize(16);
    pdf.text(
      `UPSC${subject ? ` - Subject: ${subject}` : ''}${topic ? ` - Topic: ${topic}` : ''}`,
      margin,
      y
    );
    y += 30;

    // Parse HTML and extract lines as plain text
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = resultData;

    let lines = [];
    tempDiv.querySelectorAll('p, li, div').forEach((el) => {
      const text = el.innerText.trim();
      if (text) lines.push(text);
    });

    if (lines.length === 0) {
      lines = [tempDiv.innerText.trim()];
    }

    pdf.setFontSize(12);
    lines.forEach((line) => {
      const split = pdf.splitTextToSize(line, pageWidth);
      split.forEach((txt) => {
        if (y > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          y = margin;
        }
        pdf.text(txt, margin, y);
        y += 20;
      });
      y += 5;
    });

    pdf.save(`upsc_revision_plan.pdf`);
  };

  let loadingMessage = '';
  if (customLoading) {
    if (loadingStage === 1) loadingMessage = 'Thinking...';
    else if (loadingStage === 2) loadingMessage = 'Generating revision plan...';
    else if (loadingStage === 3) loadingMessage = 'Finalising...';
  }

  return (
    <Container>
      <Title>UPSC Revision Planner</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="subject">Subject:</Label>
          <Select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="">Select Subject</option>
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="topic">Topic (optional):</Label>
          <Input
            id="topic"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic if any"
          />
        </Field>
        <Button type="submit">Generate Revision Plan</Button>
      </Form>
      <Result>
        {customLoading ? (
          <Loading>{loadingMessage}</Loading>
        ) : showResult && loading ? (
          <Loading>Thinking...</Loading>
        ) : showResult && resultData ? (
          <Loading>Revision plan generated! You can now download the PDF.</Loading>
        ) : null}
      </Result>
      {showResult && resultData && !loading && (
        <DownloadBtn onClick={handleDownloadPDF}>
          Download PDF
        </DownloadBtn>
      )}
    </Container>
  );
};

export default RevisionUPSC;