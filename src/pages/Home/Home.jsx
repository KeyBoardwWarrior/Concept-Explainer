import './Home.css';
import Main from '../../components/Main/Main';
import Header from '../../components/Header/Header';
import { useState } from "react";

function Home(){
    const [modal,setModal] = useState(false);
    const setModalValue = (modal) => {
        setModal(!modal);
    }
    console.log(modal);
    return(
        <>
            <div className="modal" style={{visibility:modal ? 'visible' : 'hidden'}}>
                <div className='loading'>
                    <div className='loading-spiral-border'>
                        <div className="loading-spiral-inner">
                        </div> 
                    </div> 
                </div>            
            </div>            
            <Header />
            <Main modal={modal} setModal={setModalValue}/>
        </>
    );
}

export default Home