import { Link } from "react-router";
import "./Header.css";
function Header(){
        return(
            <>
                <div className="header-container">
                    <div className="header-logo-container">
                        <Link to="/">
                            <span className="logo">Concept Explainer</span>
                            <span className="logo-dot">.</span>
                        </Link>
                    </div> 
                </div>
            </>
        );
}


export default Header;