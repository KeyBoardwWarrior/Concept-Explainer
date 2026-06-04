import { Link } from "react-router";
import { useState } from "react";
import HistoryDrawer from "../HistoryDrawer/HistoryDrawer";
import "./Header.css";

function Header(){
<<<<<<< HEAD
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    return(
        <>
            <div className="header-container">
                <div className="header-logo-container">
                    <Link to="/">
                        <span className="logo">Curator AI</span>
                        <span className="logo-dot">.</span>
                    </Link>
                </div> 
                <div className="header-actions">
                    <button 
                        className="history-toggle-btn" 
                        onClick={() => setIsDrawerOpen(true)}
                        aria-label="Open search history"
                    >
                        <svg className="history-btn-icon" viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        <span>History</span>
                    </button>
=======
        return(
            <>
                <div className="header-container">
                    <div className="header-logo-container">
                        <Link to="/">
                            <span className="logo">Concept Explainer</span>
                            <span className="logo-dot">.</span>
                        </Link>
                    </div> 
>>>>>>> 6e5416cf2df5acf61289cf10822920c421bcecbb
                </div>
            </div>
            <HistoryDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
        </>
    );
}


export default Header;