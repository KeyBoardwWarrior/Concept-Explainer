import {Routes,Route} from "react-router-dom";

function MyRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Home />}  /> 
            <Route path="/result" element={<Result />}  /> 
        </Routes>
    )
}