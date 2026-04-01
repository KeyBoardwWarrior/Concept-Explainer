import "./InputForm.css";

function InputForm({currentLevel, setCurrentLevel, setConcept, handleSubmit}){
    return(
        <>
            <div className="inputform-container">
                <div className="concept-input-container">
                    <div className="concept-label">
                        <p>Enter your Concept Here</p> 
                    </div> 
                    <div className="concept-input">
                        <div className="border-wrapper">
                            <input type="text" name="input" id="input" placeholder="for e.g Recursion" autoComplete="off" maxLength={50} onChange={(e) => setConcept(e.target.value)} required={true}/> 
                        </div>
                    </div>
                </div>

                <div className="level-selector-container">
                    <div className="level-selector-label">
                        <p>Depth of Intelligence</p> 
                    </div> 
                    <div className="button-group-container">
                        <div className="button-border-wrapper">
                            <div className="button-group">
                                <div className="buttons">
                                    <button style={{backgroundColor: currentLevel === 'beginner' ? 'var(--primary-color)' : 'transparent'}} onClick={() => setCurrentLevel('beginner')}>Beginner</button> 
                                    <button style={{backgroundColor: currentLevel === 'intermediate' ? 'var(--primary-color)' : 'transparent'}} onClick={() => setCurrentLevel('intermediate')}>Intermediate</button> 
                                    <button style={{backgroundColor: currentLevel === 'expert' ? 'var(--primary-color)' : 'transparent'}} onClick={() => setCurrentLevel('expert')}>Expert</button> 
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

                <div className="submit-button-container">
                    <div className="submit-button">
                        <button onClick={handleSubmit}>Explain Concept</button> 
                    </div> 
                </div>
            </div> 
        </>
    )
}

export default InputForm;