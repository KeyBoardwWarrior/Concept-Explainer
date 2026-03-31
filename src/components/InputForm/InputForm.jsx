import "./InputForm.css";

function InputForm({currentVal, setButtonVal}){
    return(
        <>
            <div className="inputform-container">
                <div className="concept-input-container">
                    <div className="concept-label">
                        <p>Enter your Concept Here</p> 
                    </div> 
                    <div className="concept-input">
                        <div className="border-wrapper">
                            <input type="text" name="input" id="input" placeholder="for e.g Recursion"/> 
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
                                    <button style={{backgroundColor: currentVal === 1 ? 'var(--primary-color' : 'transparent'}} onClick={() => setButtonVal(1)}>Beginner</button> 
                                    <button style={{backgroundColor: currentVal === 2 ? 'var(--primary-color' : 'transparent'}} onClick={() => setButtonVal(2)}>Intermediate</button> 
                                    <button style={{backgroundColor: currentVal === 3 ? 'var(--primary-color' : 'transparent'}} onClick={() => setButtonVal(3)}>Expert</button> 
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>

                <div className="submit-button-container">
                    <div className="submit-button">
                        <button>Explain Concept</button> 
                    </div> 
                </div>
            </div> 
        </>
    )
}

export default InputForm;