import './Result.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router";
import { useState } from "react";

function Result(){
    const navigate = useNavigate();
    const {state} = useLocation();
    const [analogy, setAnalogy] = useState(state?.data?.analogy || "");
    const [isGenerating, setIsGenerating] = useState(false);

    const handleGenerateNewAnalogy = async () => {
        if (isGenerating) return;
        try {
            setIsGenerating(true);
            const res = await fetch("/api/analogy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    concept: state?.concept,
                    level: state?.level || "beginner"
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to generate a new analogy. Please try again.");
            }

            const data = await res.json();
            if (data.analogy) {
                setAnalogy(data.analogy);
            } else {
                throw new Error("No analogy returned from server.");
            }
        } catch (err) {
            console.error(err);
            alert(err.message || "An error occurred while generating a new analogy.");
        } finally {
            setIsGenerating(false);
        }
    };
    return(
        <>
            <Header />
            <div className='result-container'>
                <div className="left-section">
                    {/* title-section */}
                    <div className="title-section">
                        <div className="title">
                            <p>{state.concept}</p> 
                        </div>   
                    </div>

                    {/* definition-section */}
                    <div className="definition-section">
                        <div className="outer-header-section">
                            <div className="header">
                            <p>Definition</p>  
                            </div> 
                        </div> 
                        
                        <div className="body-section">
                            <div className="body">
                            <p>{state.data.definition}</p>
                            </div> 
                        </div>
                    </div>

                    {/* principles-section */}
                    <div className="principles-section">
                        <div className="outer-header-section">
                            <div className="header">
                                Key principles 
                            </div>
                        </div>
                        <div className="principle-uno-section">
                            {/* <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>1</p>
                                </div>
                            </div> */}
                            <div className="body-section">
                                <div className="body">
                                    <p>
                                        {state.data.principles[0]}
                                    </p>
                                </div> 
                            </div>
                        </div>

                        <div className="principle-dos-section">
                            {/* <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>2</p>
                                </div>
                            </div> */}
                            <div className="body-section">
                                <div className="body">
                                    <p>
                                        {state.data.principles[1]}
                                    </p>
                                </div> 
                            </div>
                        </div>
                    </div>

                    {/* application-section */}
                    <div className="application-section">
                        <div className="outer-header-section">
                            <div className="header">
                                Applications
                            </div>
                        </div>
                        <div className="application-uno-section">
                            {/* <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>1</p>
                                </div>
                            </div> */}
                            <div className="body-section">
                                <div className="body">
                                    <p>
                                        {state.data.applications[0]} 
                                    </p>
                                </div> 
                            </div>
                        </div>

                        <div className="application-dos-section">
                            {/* <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>2</p>
                                </div>
                            </div> */}
                            <div className="body-section">
                                <div className="body">
                                    <p>
                                        {state.data.applications[1]} 
                                    </p>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

                <div className="right-section">
                    <div className="analogy-container">
                        <div className="title-section">
                            <div className="title">
                                <p>ANALOGY</p> 
                            </div>
                        </div> 

                        <div className="body-section">
                            <div className={`body ${isGenerating ? 'loading-analogy' : ''}`}>
                                <p>
                                    {analogy}
                                </p>
                            </div> 
                        </div>

                        <div className="button-section">
                            <div className="another-button">
                                <button onClick={handleGenerateNewAnalogy} disabled={isGenerating}>
                                    {isGenerating ? "Synthesizing..." : "Try Another Analogy"}
                                </button> 
                            </div> 
                            <div className="return-button">
                                <button onClick={() => navigate('/')} disabled={isGenerating}>New Analysis</button> 
                            </div> 
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default Result;