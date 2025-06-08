import React, { useContext, useState, useRef } from 'react';
import styled from 'styled-components';
import { Context } from '../../context/context';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Container = styled.div`
  max-width: 340px;
  margin: 40px auto;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 6px 32px rgba(0,0,0,0.10);
  padding: 20px 12px 16px 12px;
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

export const upscSubjectMapping = {
  "Prelims GS": [
    "History (Ancient)",
    "History (Medieval)",
    "History (Modern)",
    "Geography (India)",
    "Geography (World)",
    "Indian Polity",
    "Indian Economy",
    "Environment & Ecology",
    "Science & Technology",
    "Current Affairs"
  ],
  "Prelims CSAT": [
    "Logical Reasoning",
    "Quantitative Aptitude",
    "Reading Comprehension",
    "Data Interpretation",
    "Decision Making"
  ],
  "Mains GS I": [
    "Indian Society",
    "Modern Indian History",
    "World History",
    "Art & Culture",
    "Indian & World Geography"
  ],
  "Mains GS II": [
    "Indian Constitution",
    "Governance",
    "Polity",
    "Social Justice",
    "International Relations"
  ],
  "Mains GS III": [
    "Indian Economy",
    "Science & Technology",
    "Environment",
    "Disaster Management",
    "Agriculture",
    "Infrastructure",
    "Internal Security"
  ],
  "Mains GS IV": [
    "Ethics and Human Interface",
    "Attitude",
    "Integrity",
    "Emotional Intelligence",
    "Moral Thinkers",
    "Case Studies"
  ],
  "Essay": [
    "Philosophical",
    "Social",
    "Political",
    "Economic",
    "Science & Technology",
    "Environmental",
    "Cultural"
  ],
  "Optional Paper 1": [
    "Sociology",
    "Geography",
    "History",
    "Anthropology",
    "Philosophy",
    "Political Science & IR",
    "Public Administration",
    "Psychology",
    "Economics",
    "Commerce & Accountancy",
    "Mathematics",
    "Law",
    "Physics",
    "Chemistry",
    "Botany",
    "Zoology",
    "Agriculture",
    "Medical Science",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Statistics",
    "Animal Husbandry & Veterinary Science",
    "Literature of (Various Languages)"
  ],
  "Optional Paper 2": [
    "Sociology",
    "Geography",
    "History",
    "Anthropology",
    "Philosophy",
    "Political Science & IR",
    "Public Administration",
    "Psychology",
    "Economics",
    "Commerce & Accountancy",
    "Mathematics",
    "Law",
    "Physics",
    "Chemistry",
    "Botany",
    "Zoology",
    "Agriculture",
    "Medical Science",
    "Civil Engineering",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Statistics",
    "Animal Husbandry & Veterinary Science",
    "Literature of (Various Languages)"
  ],
  "Language Paper A": [
    "Comprehension",
    "Grammar",
    "Translation"
  ],
  "Language Paper B": [
    "Comprehension",
    "Grammar",
    "Translation"
  ],
  "Interview": [
    "Profile-based",
    "Current Affairs",
    "Ethical Dilemmas",
    "Situational Questions",
    "Opinion-based Questions"
  ]
};

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" }
];

const paperTypeOptions = [
  "MCQ",
  "Short Answer",
  "Long Answer",
  "Essay",
  "Case Study",
  "Comprehension",
  "Translation",
  "Situational"
];

const PaperUPSC = () => {
  const [upscExam, setUpscExam] = useState('');
  const [upscSubject, setUpscSubject] = useState('');
  const [upscDifficulty, setUpscDifficulty] = useState('easy');
  const [upscPaperType, setUpscPaperType] = useState('MCQ');
  const [upscNumQuestions, setUpscNumQuestions] = useState(5);
  const [customLoading, setCustomLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [input, setInput] = useState("");
            const [recentPrompt, setRecentPrompt] = useState("");
            const [previousPrompt, setPreviousPrompt] = useState([]);
            const [loading, setLoading] = useState(false);
            const [resultData, setResultData] = useState("");
            const processResponse1 = (response) => {
            setResultData(response);
          };
        const onSent5 = async (exam, sub, num , difficulty , paperType) => {
            setResultData("");
            setLoading(true);
            setShowResult(true);
            let response;
        
            if (exam !== undefined) {
              response = await run5(exam, sub, num , difficulty , paperType);
              setRecentPrompt(exam + " " + sub + " " + num);
            } else {
              setPreviousPrompt(prev => [...prev, input]);
              setRecentPrompt(input);
              response = await run5(input);
            }
        
            processResponse1(response);
            setLoading(false);
            setInput("");
          };
        async function run5(exam, sub, num , difficulty , paperType) {
            const papergene = `
You are an expert question setter for UPSC (Union Public Service Commission) examinations.
Generate a high-quality "${paperType}" exam paper for the "${exam}" in the subject of "${sub}".
The paper must:
- Begin with a clear heading that displays the exam name, subject, paper type, and difficulty level.
- Below the heading, list exactly ${num} unique and relevant questions that test a range of concepts and difficulty levels appropriate for this subject and paper type, as per the latest UPSC syllabus and pattern.
- Each question should be clearly numbered and separated by one blank line for readability.
- Ensure the questions are suitable for the "${exam}" and match the latest UPSC trends and standards for "${paperType}" questions.
- Do NOT include answers, explanations, or extra instructions—just the heading and the questions.
- Do NOT use LaTeX formatting or special symbols like $, \\frac, \\int, or superscripts/subscripts.
- Use only plain text math notation. For example:
  - Write x^2 for "x squared"
  - Write sqrt(x) for square root
  - Write integral from 0 to x of 1 / (1 + t^4) dt instead of LaTeX expressions

The overall difficulty level should be: ${difficulty || 'medium'}.
This ensures compatibility with plain text and PDF formats.

          Do NOT use LaTeX formatting or special symbols like $, \\frac, \\int, or superscripts/subscripts.
        
        Instead, use plain text math notation. For example:
        
        Write x^2 for "x squared"
        
        Write sqrt(x) for square root
        
        Write integral from 0 to x of 1 / (1 + t^4) dt instead of LaTeX expressions
        
        This ensures compatibility with plain text and PDF formats."
        `;
        
            const apiKey = "AIzaSyCQwPUode3Z9u51LVqSKr0FpsIN4FNfdvA";
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

  const resultRef = useRef();

  // Custom loading sequence
  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowResult(false);
    setCustomLoading(true);
    setLoadingStage(1);

    setTimeout(() => setLoadingStage(2), 6000); // After 6s
    setTimeout(() => setLoadingStage(3), 11000); // After 11s
    setTimeout(() => {
      setCustomLoading(false);
      setShowResult(true);
      // Replace alert with your UPSC paper generation logic
      onSent5(upscExam, upscSubject, upscNumQuestions , upscDifficulty, upscPaperType);
    }, 16000); // After 16s
  };

  // Loading message logic
  let loadingMessage = '';
  if (customLoading) {
    if (loadingStage === 1) loadingMessage = 'Thinking...';
    else if (loadingStage === 2) loadingMessage = 'Generating question paper...';
    else if (loadingStage === 3) loadingMessage = 'Finalising...';
  }

  return (
    <Container>
      <Title>UPSC Paper Generator</Title>
      <Form onSubmit={handleSubmit}>
        <Field>
          <Label>Exam Name:</Label>
          <Select
            value={upscExam}
            onChange={e => {
              setUpscExam(e.target.value);
              setUpscSubject('');
            }}
            required
          >
            <option value="">Select Exam</option>
            {Object.keys(upscSubjectMapping).map((examName) => (
              <option key={examName} value={examName}>{examName}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Subject:</Label>
          <Select
            value={upscSubject}
            onChange={e => setUpscSubject(e.target.value)}
            required
            disabled={!upscExam}
          >
            <option value="">Select Subject</option>
            {upscExam && upscSubjectMapping[upscExam].map((subj) => (
              <option key={subj} value={subj}>{subj}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Difficulty:</Label>
          <Select
            value={upscDifficulty}
            onChange={e => setUpscDifficulty(e.target.value)}
          >
            {difficultyOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Type of Paper:</Label>
          <Select
            value={upscPaperType}
            onChange={e => setUpscPaperType(e.target.value)}
          >
            {paperTypeOptions.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </Select>
        </Field>
        <Field>
          <Label>Number of Questions:</Label>
          <Select
            value={upscNumQuestions}
            onChange={e => setUpscNumQuestions(Number(e.target.value))}
          >
            {[5, 10, 15, 20, 25].map(n => (
              <option key={n} value={n}>{n}</option>
            ))}
          </Select>
        </Field>
        <Button type="submit" disabled={customLoading}>
          Generate Paper
        </Button>
      </Form>
      <Result ref={resultRef}>
        {customLoading ? (
          <Loading>{loadingMessage}</Loading>
        ) : showResult && loading ? (
          <Loading>Thinking...</Loading>
        ) : showResult && resultData ? (
          <Loading>Paper generated! You can now download the PDF.</Loading>
        ) : null}
      </Result>
      {/* {showResult && resultData && !loading && (
        <DownloadBtn onClick={handleDownloadPDF}>
          Download PDF
        </DownloadBtn>
      )} */}
    </Container>
  );
};

export default PaperUPSC;