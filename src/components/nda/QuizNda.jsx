import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import jsPDF from 'jspdf';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Container = styled.div`
  max-width: 500px;
  margin: 30px auto;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  padding: 16px 18px 16px 18px;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  min-height: 0;
  max-height: 80vh;
  overflow-y: auto;
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

const paperOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "general ability test", label: "General Ability Test" },
  { value: "all", label: "Both Papers (Maths + GAT)" },
];

const subjectOptions = [
  { value: "mathematics", label: "Mathematics" },
  { value: "english", label: "English" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "general science", label: "General Science" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "current affairs", label: "Current Affairs" },
  { value: "all", label: "All Subjects" },
];

const QuizNda = () => {
  const [paperType, setPaperType] = useState('mathematics');
  const [subject, setSubject] = useState('mathematics');
  const [difficulty, setDifficulty] = useState('easy');
  const [topics, setTopics] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const processResponse1 = (response) => {
      setResultData(response);
    };
    const onSent6 = async (exam, sub, topic, difficulty, numQues) => {
      setResultData("");
      setLoading(true);
      setShowResult(true);
      let response;
  
      if (exam !== undefined) {
        response = await run6(exam, sub, topic, difficulty, numQues);
        setRecentPrompt(exam + " " + sub + " " + topic + " " + difficulty);
      } else {
        setPreviousPrompt(prev => [...prev, input]);
        setRecentPrompt(input);
        response = await run6(input);
      }
  
      processResponse1(response);
      setLoading(false);
      setInput("");
    };
    async function run6(exam, sub, topic, difficulty, numquestions) {
      const papergene = `
You are an expert question setter for the National Defence Academy (NDA) entrance examination in India.
Generate a well-structured, in-syllabus multiple-choice quiz for the "${exam}" in the subject of "${sub}"${topic ? `, specifically focusing on the topic: "${topic}"` : ''}.
The quiz must:
- Contain exactly ${numquestions} unique, original multiple-choice questions (MCQs), strictly following the latest NDA syllabus and question pattern for this subject.
- Mix conceptual, application-based, and tricky questions to reflect real NDA exam standards and trends.
- Each question should be clearly numbered and presented in a new paragraph.
- Provide exactly 4 answer choices labeled (A), (B), (C), and (D), each on a separate line.
- Indicate the correct answer immediately after each question, using this format: Answer: [Option Letter].
- Do NOT include explanations, hints, or extra instructions—just the quiz.
- Do NOT use LaTeX formatting or special symbols like $, \\frac, \\int, or superscripts/subscripts.
- Use only plain text math notation (e.g., x^2 for "x squared", sqrt(x) for square root, integral from 0 to x of 1 / (1 + t^4) dt).
- Each question and its options should not exceed 5 lines total (for PDF formatting).
- Leave a blank line between questions for readability.
- Begin the quiz with a centered heading: "${exam.toUpperCase()} – ${sub.toUpperCase()}${topic ? ` | Topic: ${topic}` : ''} | Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}"
- Ensure the layout is clean, minimal, and optimized for PDF export.

The overall difficulty level should be: ${difficulty || 'easy'}.
This ensures compatibility with plain text and PDF formats.
`;
    
        const apiKey = "AIzaSyDvIoMSFQfWP5i0njGagatlUg1ctr3tyf8";
        const genAI = new GoogleGenerativeAI(apiKey);
    
        const model = genAI.getGenerativeModel({
          model: "gemini-1.5-flash",
        });
    
        const generationConfig = {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          responseMimeType: "text/plain",
        };
    
        const fullPrompt = papergene;
    
        const chatSession = model.startChat({
          generationConfig,
          history: [
            {
              role: "user",
              parts: [{ text: fullPrompt }],
            },
          ],
        });
    
        const result = await chatSession.sendMessage(fullPrompt);
        return result.response.text();
      }
  const [showResult, setShowResult] = useState(false);
  const [customLoading, setCustomLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);

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
      onSent6(paperType, subject, topics, difficulty, numQuestions);
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
      `NDA - ${paperType.toUpperCase()} - ${subject.toUpperCase()}${topics ? ` - Topics: ${topics}` : ''} - Difficulty: ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`,
      margin,
      y
    );
    y += 30;

    // Parse HTML and extract questions as plain text
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

    pdf.save(`nda_${paperType}_${subject}_quiz.pdf`);
  };

  let loadingMessage = '';
  if (customLoading) {
    if (loadingStage === 1) loadingMessage = 'Thinking...';
    else if (loadingStage === 2) loadingMessage = 'Generating quiz...';
    else if (loadingStage === 3) loadingMessage = 'Finalising...';
  }

  return (
    <Container>
      <Title>NDA Quiz Generator</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label htmlFor="paperType">Paper:</Label>
          <Select
            id="paperType"
            value={paperType}
            onChange={(e) => setPaperType(e.target.value)}
          >
            {paperOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="subject">Subject:</Label>
          <Select
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            {subjectOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label htmlFor="difficulty">Difficulty:</Label>
          <Select
            id="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </Select>
        </Field>
        <Field>
          <Label htmlFor="numQuestions">Number of Questions:</Label>
          <Select
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </Select>
        </Field>
        <Field>
          <Label htmlFor="topics">Topics (optional):</Label>
          <Input
            id="topics"
            type="text"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
            placeholder="Enter topics separated by commas"
          />
        </Field>
        <Button type="submit">Generate Quiz</Button>
      </Form>
      <Result>
        {customLoading ? (
          <Loading>{loadingMessage}</Loading>
        ) : showResult && loading ? (
          <Loading>Thinking...</Loading>
        ) : showResult && resultData ? (
          <Loading>Quiz generated! You can now download the PDF.</Loading>
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

export default QuizNda;