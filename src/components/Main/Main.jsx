import "./Main.css";
import InputForm from "../InputForm/InputForm";
import Footer from "../Footer/Footer";
function Main(){
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
                        <InputForm/>
                    </div>

            </div> 
            <Footer/>
        </>
    )
}

export default Main;