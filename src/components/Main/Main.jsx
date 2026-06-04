import "./Main.css";
import InputForm from "../InputForm/InputForm";
import Footer from "../Footer/Footer";
import { useState } from "react";
import { useNavigate } from "react-router";

<<<<<<< HEAD
import { saveToHistory } from "../../utils/history";

function Main({setIsLoading}){
=======
function Main({isLoading, setIsLoading}){
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
    const navigate = useNavigate();
    const [level,setLevel] = useState('beginner');
    const [concept, setConcept] = useState("");

    const handleSubmit = async () => {
        if(concept.trim() === "") {alert("Please enter a concept"); return;}
        try{
            setIsLoading(true);
            const res = await fetch("/api/explain",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({concept: concept.trim(), level}),
            });

            if (!res.ok) {
                throw new Error("Failed to deconstruct concept. Please try again.");
            }

            const data = await res.json();
<<<<<<< HEAD
            saveToHistory(concept.trim(), level, data);
=======
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
            navigate("/result",{state:{data,concept: concept.trim(), level}});
        }catch(err){
            console.error(err);
            alert(err.message || "An error occurred while fetching details.");
        }finally{
            setIsLoading(false);
        }
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