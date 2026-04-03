import "./Main.css";
import InputForm from "../InputForm/InputForm";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router";

function Main(){
    const navigate = useNavigate();
    const [level,setLevel] = useState('beginner');
    const [concept, setConcept] = useState("");


    const handleSubmit = () => {
        if(concept === "") {alert("Empty Field"); return;}
        navigate('/loading',{state:{concept,level}});
    }
    return(
        <>
            <div className="main-container">
                    <div className="left-side">
                        <div className="heading-text">
                            <p>What shall we <span>deconstruct</span> today ?</p> 
                        </div> 

                        <div className="body-text">
                            <p>
                                Turn complex academic concepts into clear,
                                beautiful insights. Bridging the gap between data
                                and wisdom.
                            </p>  
                        </div>
                    </div> 

                    <div className="input-container">
                        <InputForm currentLevel={level} setCurrentLevel={setLevel} setConcept={setConcept} handleSubmit={handleSubmit}/>
                    </div>

            </div> 
            <Footer/>
        </>
    )
}

export default Main;