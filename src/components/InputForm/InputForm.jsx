import "./InputForm.css";
function InputForm(){
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
                                    <button>Beginner</button> 
                                    <button>Intermediate</button> 
                                    <button>Expert</button> 
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