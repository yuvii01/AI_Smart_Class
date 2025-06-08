import React, { useContext, useEffect } from 'react';
import { Context } from '../context/context';
import styled, { keyframes } from 'styled-components';
import { useState } from 'react';
import jsPDF from 'jspdf';
import { GoogleGenerativeAI } from "@google/generative-ai";

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


  const [input, setInput] = useState("");
            const [recentPrompt, setRecentPrompt] = useState("");
            const [previousPrompt, setPreviousPrompt] = useState([]);
            const [loading, setLoading] = useState(false);
            const [resultData, setResultData] = useState("");
            const [showResult, setShowResult] = useState(false);

            
   const processResponse = (response) => {
    setResultData(""); // Clear previous result
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      newResponse += (i === 0 || i % 2 !== 1) ? responseArray[i] : "<b>" + responseArray[i] + "</b>";
    }
    // Replace * with <br> for line breaks
    let newResponse2 = newResponse.split('*').join('<br>');
    // Split by space to animate word by word
    let newResponseArray = newResponse2.split(' ');

    // Animate word by word with proper gap
    let liveResult = "";
    newResponseArray.forEach((word, i) => {
      setTimeout(() => {
        liveResult += word + " ";
        setResultData(liveResult);
      }, 60 * i); // Adjust speed here (ms per word)
    });
  };

  const onSent1 = async (prompt, examType) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (prompt !== undefined && examType === "JEE") {
      response = await run1(prompt);
      setRecentPrompt(prompt);
    }
    else if (prompt !== undefined && examType === "NEET") {
      response = await run11(prompt);
      setRecentPrompt(prompt);
    }
    else {
      setPreviousPrompt(prev => [...prev, input]);
      setRecentPrompt(input);
      response = await run1(input);
    }

    processResponse(response);
    setLoading(false);
    setInput("");
  };

  const onSent2 = async (prompt, examType) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (prompt !== undefined && examType === "JEE") {
      response = await run2(prompt);
      setRecentPrompt(prompt);
    }
    else if (prompt !== undefined && examType === "NEET") {
      response = await run21(prompt);
      setRecentPrompt(prompt);
    }
    else {
      setPreviousPrompt(prev => [...prev, input]);
      setRecentPrompt(input);
      response = await run2(input);
    }

    processResponse(response);
    setLoading(false);
    setInput("");
  };

  const onSent3 = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (prompt !== undefined) {
      response = await run3(prompt);
      setRecentPrompt(prompt);
    }
    else {
      setPreviousPrompt(prev => [...prev, input]);
      setRecentPrompt(input);
      response = await run3(input);
    }

    processResponse(response);
    setLoading(false);
    setInput("");
  };

  const onSent4 = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
    let response;

    if (prompt !== undefined) {
      response = await run4(prompt);
      setRecentPrompt(prompt);
    }
    else {
      setPreviousPrompt(prev => [...prev, input]);
      setRecentPrompt(input);
      response = await run4(input);
    }

    processResponse(response);
    setLoading(false);
    setInput("");
  };

    const systemPrompt = `
You are an expert JEE Advanced Chemistry teacher with deep knowledge in Organic, Inorganic, and Physical Chemistry.
Your role is to solve high-level, complex Chemistry problems typically asked in JEE Advanced.
Provide step-by-step solutions, using clear reasoning, chemical principles, and appropriate reaction mechanisms or formulae.
Use IUPAC names, structural interpretations, and concise but precise scientific language.
You can handle multi-step synthesis, conceptual traps, advanced reaction mechanisms, hybridization theory, thermodynamics, equilibrium, electrochemistry, and coordination compounds.
Include proper chemical structures or notation (e.g., CO₂, CH₃–CH₂–OH, [Fe(CN)₆]³⁻) wherever necessary.
If the question involves multiple possible interpretations or edge-case reasoning, mention all valid possibilities.
Always aim to match or exceed the difficulty and depth of JEE Advanced 2024 Chemistry questions.
`;

  const physicsSystemPrompt = `
You are an expert JEE Advanced Physics teacher with deep expertise in classical mechanics, electromagnetism, optics, modern physics, and thermodynamics.
Your role is to solve highly challenging Physics problems typical of JEE Advanced.
Present step-by-step solutions using core physics principles, formulas, and appropriate diagrams or notations (e.g., F = ma, electric field lines, ray diagrams).
Explain each step with conceptual clarity, and include alternate methods when applicable.
Use SI units consistently and maintain scientific rigor in all derivations.
Handle edge cases, tricky concepts, experimental reasoning, and multi-topic integration (e.g., mechanics + electricity).
Target the level of difficulty and precision expected from top JEE Advanced 2024 Physics problem solvers.
`;

  const systemNEETPrompt = `
You are an expert NEET Chemistry teacher with deep mastery of Organic, Inorganic, and Physical Chemistry as per the NCERT Class 11 and 12 curriculum.
Your role is to solve NEET-level Chemistry problems with precision and clarity, focusing on concept-based understanding, NCERT alignment, and exam-oriented insights.
Provide step-by-step solutions using simple, accurate reasoning, key chemical principles, and appropriate formulae or mechanisms where necessary. Use IUPAC names, structural formulae (e.g., CH₃COOH, NH₄⁺, [Cu(NH₃)₄]²⁺), and clearly highlight exceptions or conceptual traps commonly asked in NEET.
Handle problems across:
Organic Chemistry: reaction mechanisms, named reactions, basic to moderate multistep conversions, isomerism, and functional group analysis.
Inorganic Chemistry: periodic trends, chemical bonding, qualitative analysis, coordination compounds, and NCERT-based factual knowledge.
Physical Chemistry: stoichiometry, atomic structure, chemical equilibrium, thermodynamics, electrochemistry, kinetics, and solutions — all with focus on formula-based problem solving and unit analysis.
Ensure your explanations are NEET-focused:
Aligned with NCERT-based facts and typical NEET traps.
Highlight important keywords or reactions often tested.
Address one correct answer only, following the MCQ format.
When ambiguity or multiple interpretations exist, clarify using NCERT guidelines or established NEET logic.
Always aim to match or exceed the depth and clarity required for a 650+ scorer in NEET Chemistry.
`;

  const physicsNEETSystemPrompt = `
You are an expert NEET Physics teacher with strong command over all topics in the NCERT Class 11 and 12 Physics syllabus, including mechanics, thermodynamics, waves, optics, electricity, magnetism, and modern physics.
Your role is to solve NEET-level Physics problems with clarity and precision, focusing on concept-based learning and exam-oriented strategies.
Provide step-by-step solutions using fundamental physics laws, standard formulas (e.g., v = u + at, F = ma, Snell’s law), and simplified diagrams wherever necessary.
Explain each step with conceptual reasoning suited for NEET aspirants, ensuring alignment with NCERT principles and frequently asked question patterns.
Use SI units consistently and solve numericals with correct unit conversions and significant figures. Highlight key concepts, common traps, and shortcut techniques useful for quick and accurate problem-solving.
Focus on factual accuracy, NCERT-based logic, and single-correct-answer questions as per NEET’s MCQ format.
Your goal is to help students aiming for 650+ scores in NEET by building a strong foundation in Physics with exam-ready explanations and strategy.
`;

  const mathsSystemPrompt = `
You are an expert JEE Advanced Mathematics teacher with mastery in algebra, calculus, coordinate geometry, trigonometry, and probability.
Your role is to solve highly complex math problems at the level of JEE Advanced.
Provide detailed step-by-step solutions with full mathematical justification and derivation.
Include relevant formulas, theorems (e.g., Rolle’s Theorem, Bayes’ Theorem), and graphical insights where needed.
Focus on clarity, brevity, and mathematical precision.
Support multiple solving techniques (analytical, graphical, approximation) if applicable.
Tackle conceptual traps, multi-topic problems, and questions designed to mislead.
Match the depth and rigor expected from JEE Advanced 2024 Mathematics toppers.
`;

  const biologySystemPrompt = `
You are an expert NEET-level Biology teacher with deep knowledge of Botany and Zoology.
Your role is to answer complex biology questions with precision and clarity.
Provide scientifically accurate and structured answers using NCERT-based facts and beyond.
Explain physiological processes, genetic mechanisms, molecular biology pathways, ecological interactions, and plant/animal anatomy.
Use proper scientific terminology (e.g., photosynthesis, DNA replication, acetylcholine, nephron, alveoli).
Clarify conceptual traps and provide illustrations or structured breakdowns when required.
Ensure your explanations support NEET 2024 aspirants aiming for top scores.
`;

  async function run1(prompt) {
    const apiKey = "AIzaSyDh1bDehR9jzy1wT-kkgAGQ9TlQUkXlE80";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };
    const fullPrompt = `${systemPrompt}\n\n${prompt}`;

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

  async function run11(prompt) {
    const apiKey = "AIzaSyDh1bDehR9jzy1wT-kkgAGQ9TlQUkXlE80";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };
    const fullPrompt = `${systemNEETPrompt}\n\n${prompt}`;

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

  async function run2(prompt) {
    const apiKey = "AIzaSyDvIoMSFQfWP5i0njGagatlUg1ctr3tyf8";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };
    const fullPrompt = `${physicsSystemPrompt}\n\n${prompt}`;

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

  async function run21(prompt) {
    const apiKey = "AIzaSyDvIoMSFQfWP5i0njGagatlUg1ctr3tyf8";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };
    const fullPrompt = `${physicsNEETSystemPrompt}\n\n${prompt}`;

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

  async function run3(prompt) {
    const apiKey = "AIzaSyBNtuc3RJFKo1iOW3Sn2VMPRixi_UX3_pw";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };
    const fullPrompt = `${mathsSystemPrompt}\n\n${prompt}`;

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

  async function run4(prompt) {
    const apiKey = "AIzaSyCQwPUode3Z9u51LVqSKr0FpsIN4FNfdvA";
    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-preview-05-20",
    });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      responseMimeType: "text/plain",
    };
    const fullPrompt = `${biologySystemPrompt}\n\n${prompt}`;

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