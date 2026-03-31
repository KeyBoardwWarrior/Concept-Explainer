import './Result.css';
import Header from '../../components/Header/Header';

function Result(){
    return(
        <>
            <Header />
            <div className='result-container'>
                <div className="left-section">
                    {/* title-section */}
                    <div className="title-section">
                        <div className="title">
                            <p>Quantum Entanglement</p> 
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
                            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, ratione. Adipisci cum dolor nemo tenetur tempore quia natus saepe molestias quo, harum necessitatibus non at earum. Rem perspiciatis ea fugiat?</p> 
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
                            <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>Non Locality</p>
                                </div>
                            </div>
                            <div className="body-section">
                                <div className="body">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, ratione. Adipisci cum dolor nemo tenetur tempore quia natus saepe molestias quo, harum necessitatibus non at earum. Rem perspiciatis ea fugiat?</p> 
                                </div> 
                            </div>
                        </div>

                        <div className="principle-dos-section">
                            <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>Non Locality</p>
                                </div>
                            </div>
                            <div className="body-section">
                                <div className="body">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, ratione. Adipisci cum dolor nemo tenetur tempore quia natus saepe molestias quo, harum necessitatibus non at earum. Rem perspiciatis ea fugiat?</p> 
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
                            <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>Quantum Cryptography</p>
                                </div>
                            </div>
                            <div className="body-section">
                                <div className="body">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, ratione. Adipisci cum dolor nemo tenetur tempore quia natus saepe molestias quo, harum necessitatibus non at earum. Rem perspiciatis ea fugiat?</p> 
                                </div> 
                            </div>
                        </div>

                        <div className="application-dos-section">
                            <div className="inner-title-section">
                                <div className="inner-title">
                                    <p>Quantum Cryptography</p>
                                </div>
                            </div>
                            <div className="body-section">
                                <div className="body">
                                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fuga, ratione. Adipisci cum dolor nemo tenetur tempore quia natus saepe molestias quo, harum necessitatibus non at earum. Rem perspiciatis ea fugiat?</p> 
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
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia, assumenda inventore! Exercitationem quasi aliquam molestiae optio voluptates officiis dolore expedita, nesciunt est inventore incidunt, et iusto dolorem dolores, earum unde ipsum impedit modi provident doloribus magni. Consequuntur, quisquam! Quibusdam quidem veritatis at voluptatem? Assumenda similique placeat sed incidunt soluta cupiditate possimus rem asperiores quia, adipisci fuga dicta. Porro eos quod incidunt ipsum quia totam, necessitatibus, fugiat neque quidem eum aliquam quas repudiandae numquam facere quisquam repellat laudantium consequatur iusto cupiditate illum debitis impedit. Cum perferendis et quisquam, hic excepturi labore possimus laudantium molestiae, alias, dolorem quod impedit quam ipsum. Doloribus?</p>
                            </div> 
                        </div>

                        <div className="button-section">
                            <div className="another-button">
                                <button>Try Another Analogy</button> 
                            </div> 
                            <div className="return-button">
                                <button>New Analysis</button> 
                            </div> 
                        </div>
                    </div> 
                </div>
            </div>
        </>
    );
}

export default Result;