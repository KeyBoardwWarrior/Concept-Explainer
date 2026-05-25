import './Home.css';
import Main from '../../components/Main/Main';
import Header from '../../components/Header/Header';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';
import { useState } from "react";

function Home(){
    const [isLoading, setIsLoading] = useState(false);

    return(
        <>
            {isLoading && <LoadingScreen />}
            <Header />
            <Main isLoading={isLoading} setIsLoading={setIsLoading}/>
        </>
    );
}

export default Home;