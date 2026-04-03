import './Loading.css';
import { useNavigate,useLocation } from 'react-router';
import { useEffect } from 'react';

function Loading(){

    const navigate = useNavigate();
    const {state}  = useLocation();
    const concept = state.concept;
    console.log(concept);
    useEffect(() => {
        const fetchData = async () => {
        try {
            const res = await fetch("/api/explain", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(state),
            });

            const data = await res.json();

            navigate("/result", { state: {data,concept}});

        } catch (err) {
            console.error(err);
        }
        };

        fetchData();
    }, []);
    return(
        <div className='loading'>
            <div className='loading-spiral-border'>
                <div className="loading-spiral-inner">
                    
                </div> 
            </div> 
        </div>
    );
}

export default Loading;