import './Result.css';
import Header from '../../components/Header/Header';
import { useNavigate } from 'react-router';
import { useLocation } from "react-router"

function Result(){
    const navigate = useNavigate()
    const {state} = useLocation();
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
                                <p>Analogy Generator</p> 
                            </div>
                        </div> 

                        <div className="body-section">
                            <div className="body">
                                <p>
                                    {state.data.analogy}
                                </p>
                            </div> 
                        </div>

                        <div className="button-section">
                            <div className="another-button">
                                <button>Try Another Analogy</button> 
                            </div> 
                            <div className="return-button">
                                <button onClick={() => navigate('/')}>New Analysis</button> 
                            </div> 
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default Result;