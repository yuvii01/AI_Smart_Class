import { createContext, useState } from "react";
import { run1,run11 , run2, run21, run3, run4 , run5 , run6 , run7} from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [previousPrompt, setPreviousPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setResultData(prev => prev + nextWord);
        }, 75 * index);
    };

    const processResponse1 = (response) => {
        setResultData(response);
    };

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

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    };

    const onSent1 = async (prompt , examType) => {
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

    const onSent2 = async (prompt , examType) => {
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



    const onSent5 = async (exam , sub , num) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        if (exam !== undefined) {
            response = await run5(exam , sub , num);
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



    const onSent6 = async (exam , sub , topic , difficulty , numQues) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        if (exam !== undefined) {
            response = await run6(exam , sub , topic , difficulty , numQues);
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



    const onSent7 = async (exam , sub , topic ) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;

        if (exam !== undefined) {
            response = await run7(exam , sub , topic );
            setRecentPrompt(exam + " " + sub + " " + topic );
        } else {
            setPreviousPrompt(prev => [...prev, input]);
            setRecentPrompt(input);
            response = await run7(input);
        }

        processResponse1(response);
        setLoading(false);
        setInput("");
    };


    const contextValue = {
        previousPrompt,
        setPreviousPrompt,
        onSent1,
        onSent2,
        onSent3,
        onSent4,
        onSent5,
        onSent6 ,
        onSent7 ,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        setResultData,
        resultData,
        input,
        setInput,
        newChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
