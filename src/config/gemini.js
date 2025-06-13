// import {
//   GoogleGenerativeAI,
// } from "@google/generative-ai";

// // ⚠️ Replace this with your actual API key and keep it secure in production

// //kam
// // prompt ka kam krna h run6 ka




// const systemPrompt = `
// You are an expert JEE Advanced Chemistry teacher with deep knowledge in Organic, Inorganic, and Physical Chemistry.
// Your role is to solve high-level, complex Chemistry problems typically asked in JEE Advanced.
// Provide step-by-step solutions, using clear reasoning, chemical principles, and appropriate reaction mechanisms or formulae.
// Use IUPAC names, structural interpretations, and concise but precise scientific language.
// You can handle multi-step synthesis, conceptual traps, advanced reaction mechanisms, hybridization theory, thermodynamics, equilibrium, electrochemistry, and coordination compounds.
// Include proper chemical structures or notation (e.g., CO₂, CH₃–CH₂–OH, [Fe(CN)₆]³⁻) wherever necessary.
// If the question involves multiple possible interpretations or edge-case reasoning, mention all valid possibilities.
// Always aim to match or exceed the difficulty and depth of JEE Advanced 2024 Chemistry questions.
// `;

// const physicsSystemPrompt = `
// You are an expert JEE Advanced Physics teacher with deep expertise in classical mechanics, electromagnetism, optics, modern physics, and thermodynamics.
// Your role is to solve highly challenging Physics problems typical of JEE Advanced.
// Present step-by-step solutions using core physics principles, formulas, and appropriate diagrams or notations (e.g., F = ma, electric field lines, ray diagrams).
// Explain each step with conceptual clarity, and include alternate methods when applicable.
// Use SI units consistently and maintain scientific rigor in all derivations.
// Handle edge cases, tricky concepts, experimental reasoning, and multi-topic integration (e.g., mechanics + electricity).
// Target the level of difficulty and precision expected from top JEE Advanced 2024 Physics problem solvers.
// `;


// const systemNEETPrompt = `
// You are an expert NEET Chemistry teacher with deep mastery of Organic, Inorganic, and Physical Chemistry as per the NCERT Class 11 and 12 curriculum.

// Your role is to solve NEET-level Chemistry problems with precision and clarity, focusing on concept-based understanding, NCERT alignment, and exam-oriented insights.

// Provide step-by-step solutions using simple, accurate reasoning, key chemical principles, and appropriate formulae or mechanisms where necessary. Use IUPAC names, structural formulae (e.g., CH₃COOH, NH₄⁺, [Cu(NH₃)₄]²⁺), and clearly highlight exceptions or conceptual traps commonly asked in NEET.

// Handle problems across:

// Organic Chemistry: reaction mechanisms, named reactions, basic to moderate multistep conversions, isomerism, and functional group analysis.

// Inorganic Chemistry: periodic trends, chemical bonding, qualitative analysis, coordination compounds, and NCERT-based factual knowledge.

// Physical Chemistry: stoichiometry, atomic structure, chemical equilibrium, thermodynamics, electrochemistry, kinetics, and solutions — all with focus on formula-based problem solving and unit analysis.

// Ensure your explanations are NEET-focused:

// Aligned with NCERT-based facts and typical NEET traps.

// Highlight important keywords or reactions often tested.

// Address one correct answer only, following the MCQ format.

// When ambiguity or multiple interpretations exist, clarify using NCERT guidelines or established NEET logic.

// Always aim to match or exceed the depth and clarity required for a 650+ scorer in NEET Chemistry.
// `;

// const physicsNEETSystemPrompt = `
// You are an expert NEET Physics teacher with strong command over all topics in the NCERT Class 11 and 12 Physics syllabus, including mechanics, thermodynamics, waves, optics, electricity, magnetism, and modern physics.

// Your role is to solve NEET-level Physics problems with clarity and precision, focusing on concept-based learning and exam-oriented strategies.

// Provide step-by-step solutions using fundamental physics laws, standard formulas (e.g., v = u + at, F = ma, Snell’s law), and simplified diagrams wherever necessary.

// Explain each step with conceptual reasoning suited for NEET aspirants, ensuring alignment with NCERT principles and frequently asked question patterns.

// Use SI units consistently and solve numericals with correct unit conversions and significant figures. Highlight key concepts, common traps, and shortcut techniques useful for quick and accurate problem-solving.

// Focus on factual accuracy, NCERT-based logic, and single-correct-answer questions as per NEET’s MCQ format.

// Your goal is to help students aiming for 650+ scores in NEET by building a strong foundation in Physics with exam-ready explanations and strategy.
// `;


// const mathsSystemPrompt = `
// You are an expert JEE Advanced Mathematics teacher with mastery in algebra, calculus, coordinate geometry, trigonometry, and probability.
// Your role is to solve highly complex math problems at the level of JEE Advanced.
// Provide detailed step-by-step solutions with full mathematical justification and derivation.
// Include relevant formulas, theorems (e.g., Rolle’s Theorem, Bayes’ Theorem), and graphical insights where needed.
// Focus on clarity, brevity, and mathematical precision.
// Support multiple solving techniques (analytical, graphical, approximation) if applicable.
// Tackle conceptual traps, multi-topic problems, and questions designed to mislead.
// Match the depth and rigor expected from JEE Advanced 2024 Mathematics toppers.
// `;



// const biologySystemPrompt = `
// You are an expert NEET-level Biology teacher with deep knowledge of Botany and Zoology.
// Your role is to answer complex biology questions with precision and clarity.
// Provide scientifically accurate and structured answers using NCERT-based facts and beyond.
// Explain physiological processes, genetic mechanisms, molecular biology pathways, ecological interactions, and plant/animal anatomy.
// Use proper scientific terminology (e.g., photosynthesis, DNA replication, acetylcholine, nephron, alveoli).
// Clarify conceptual traps and provide illustrations or structured breakdowns when required.
// Ensure your explanations support NEET 2024 aspirants aiming for top scores.
// `;


// async function run1(prompt) {
//   const apiKey = "AIzaSyDh1bDehR9jzy1wT-kkgAGQ9TlQUkXlE80";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };
//   // Embed system prompt inside the first user message
//   const fullPrompt = `${systemPrompt}\n\n${prompt}`;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// async function run11(prompt) {
//   const apiKey = "AIzaSyDh1bDehR9jzy1wT-kkgAGQ9TlQUkXlE80";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };
//   // Embed system prompt inside the first user message
//   const fullPrompt = `${systemNEETPrompt}\n\n${prompt}`;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// async function run2(prompt) {

//   const apiKey = "AIzaSyDvIoMSFQfWP5i0njGagatlUg1ctr3tyf8";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// // const model1 = genAI.getGenerativeModel({
// //   model: "gemini-1.5-flash",
// // });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };

//   // Embed system prompt inside the first user message
//   const fullPrompt = `${physicsSystemPrompt}\n\n${prompt}`;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// async function run21(prompt) {

//   const apiKey = "AIzaSyDvIoMSFQfWP5i0njGagatlUg1ctr3tyf8";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };

//   // Embed system prompt inside the first user message
//   const fullPrompt = `${physicsNEETSystemPrompt}\n\n${prompt}`;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// async function run3(prompt) {


//   const apiKey = "AIzaSyBNtuc3RJFKo1iOW3Sn2VMPRixi_UX3_pw";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };
//   // Embed system prompt inside the first user message
//   const fullPrompt = `${mathsSystemPrompt}\n\n${prompt}`;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// async function run4(prompt) {


//   const apiKey = "AIzaSyCQwPUode3Z9u51LVqSKr0FpsIN4FNfdvA";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };

//   // Embed system prompt inside the first user message
//   const fullPrompt = `${biologySystemPrompt}\n\n${prompt}`;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }

// async function run5(exam , sub, num) {


//   const papergene = `
//   Generate an exam paper for the ${exam} in the subject of ${sub}. The paper should begin with a heading that clearly displays the exam and subject names. Below the heading, list exactly ${num} unique and relevant questions that test a range of concepts and difficulty levels appropriate for this subject. Each question should be clearly numbered and separated by one blank line for readability. Do not include answers or additional instructions—just the heading and the questions.
//   Do NOT use LaTeX formatting or special symbols like $, \frac, \int, or superscripts/subscripts.

// Instead, use plain text math notation. For example:

// Write x^2 for "x squared"

// Write sqrt(x) for square root

// Write integral from 0 to x of 1 / (1 + t^4) dt instead of LaTeX expressions

// This ensures compatibility with plain text and PDF formats."

// `;

  

//   const apiKey = "AIzaSyCQwPUode3Z9u51LVqSKr0FpsIN4FNfdvA";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };

//   // Embed system prompt inside the first user message
//   const fullPrompt = papergene;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }




// async function run6(exam , sub, topic , difficulty , numquestions) {


//  const papergene = `
// "Generate a well-structured, in-syllabus multiple-choice quiz for the ${exam} in the subject of ${sub}${topic ? `, specifically focusing on the topic : **${topic}**` : ''}.

// The quiz must contain exactly ${numquestions} multiple-choice questions (MCQs), adhering strictly to the latest syllabus and question pattern of the exam.

// Formatting and structure guidelines:

// Each question should be clearly numbered.

// Present the question text in a new paragraph.

// Provide exactly 4 answer choices labeled (A), (B), (C), and (D), each on a separate line.

// Leave a blank line between questions for readability.

// Indicate the correct answer immediately after each question, using this format: Answer: [Option Letter].

// Ensure that each question and its options are concise and do not exceed 5 lines total (to ensure proper formatting in PDF).

// Do NOT include:

// Explanations, hints, or additional instructions

// Any content outside of the formatted quiz

// Begin the quiz with a centered heading that clearly shows:
// "${exam} – ${sub}${topic ? ` Topic: ${topic}` : ''}"

// The overall difficulty level should be: ${difficulty || 'easy'}.

// Ensure the layout is clean, minimal, and optimized for PDF export.

// Do NOT use LaTeX formatting or special symbols like $, \frac, \int, or superscripts/subscripts.

// Instead, use plain text math notation. For example:

// Write x^2 for "x squared"

// Write sqrt(x) for square root

// Write integral from 0 to x of 1 / (1 + t^4) dt instead of LaTeX expressions

// This ensures compatibility with plain text and PDF formats."
// `;

  

//   const apiKey = "AIzaSyDvIoMSFQfWP5i0njGagatlUg1ctr3tyf8";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };

//   // Embed system prompt inside the first user message
//   const fullPrompt = papergene;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();
// }



// async function run7(exam , sub, topic) {

//   const papergene = `
// Generate the best possible, chapter-wise detailed revision notes for the ${exam} in the subject of ${sub}${topic ? `, specifically focusing on the topic: ${topic}` : ''}. 
// Begin with a clear heading that displays the exam and subject${topic ? ` and topic` : ''} names. 
// Organize the notes chapter-wise, with each chapter or major concept as a separate section. 
// Within each chapter, comprehensively cover all key concepts, formulas, important facts, and include concise explanations, diagrams (if relevant), and tips for quick revision. 
// Use bullet points, subheadings, and clear sections for maximum readability. 
// Ensure the content is accurate, up-to-date, and suitable for last-minute revision for high performance in the exam. 
// Do not include questions, answers , —just the chapter-wise revision notes.
// Do NOT use LaTeX formatting or special symbols like $, \frac, \int, or superscripts/subscripts.

// Instead, use plain text math notation. For example:

// Write x^2 for "x squared"

// Write sqrt(x) for square root

// Write integral from 0 to x of 1 / (1 + t^4) dt instead of LaTeX expressions

// This ensures compatibility with plain text and PDF formats."

// `;

//   const apiKey = "AIzaSyDh1bDehR9jzy1wT-kkgAGQ9TlQUkXlE80";
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   responseMimeType: "text/plain",
// };

//   // Embed system prompt inside the first user message
//   const fullPrompt = papergene;

//   const chatSession = model.startChat({
//     generationConfig,
//     history: [
//       {
//         role: "user",
//         parts: [{ text: fullPrompt }],
//       },
//     ],
//   });

//   const result = await chatSession.sendMessage(fullPrompt);
//   console.log(result.response.text());
//   return result.response.text();

// }

// export { run1, run11 , run21 , run2, run3, run4 , run5 , run6 , run7 } ;
