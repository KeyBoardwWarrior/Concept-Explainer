import { Link } from "react-router";
import "./Header.css";
function Header(){
        return(
            <>
                <div className="header-container">
                    <div className="header-logo-container">
                        <Link to="/">
                            <p className="logo">Curator AI</p>
                        </Link>
                    </div> 
                </div>
            </>
        );
}

export default Header;