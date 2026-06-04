import { useState, useEffect } from "react";
import "./LoadingScreen.css";

const loadingMessages = [
    "Initiating semantic decomposition...",
    "Analyzing core definition & structure...",
    "Isolating fundamental principles...",
    "Formulating contextual real-world applications...",
    "Synthesizing an intuitive conceptual analogy...",
    "Polishing the final layout for you..."
];

function LoadingScreen() {
    const [messageIndex, setMessageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
        }, 2200);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="loading-overlay">
            <div className="loading-card">
                <div className="spinner-container">
                    <div className="glowing-spinner">
                        <div className="spinner-inner"></div>
                    </div>
                </div>
                <div className="loading-text-container">
                    <h3 className="loading-title">Curator AI</h3>
                    <p className="loading-status">{loadingMessages[messageIndex]}</p>
                </div>
                <div className="progress-bar-track">
                    <div className="progress-bar-fill" style={{ animationDuration: `${loadingMessages.length * 2.2}s` }}></div>
                </div>
            </div>
        </div>
    );
}

export default LoadingScreen;
