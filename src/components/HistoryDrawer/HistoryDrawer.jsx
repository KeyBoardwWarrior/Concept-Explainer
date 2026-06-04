import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { getHistory, deleteFromHistory, clearHistory } from "../../utils/history";
import "./HistoryDrawer.css";

function HistoryDrawer({ isOpen, onClose }) {
    const navigate = useNavigate();
    const [history, setHistory] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const drawerRef = useRef(null);

    // Load history and subscribe to changes
    useEffect(() => {
        const loadHistory = () => {
            setHistory(getHistory());
        };

        loadHistory();
        window.addEventListener("historyUpdated", loadHistory);
        return () => {
            window.removeEventListener("historyUpdated", loadHistory);
        };
    }, []);

    // Focus search input when drawer opens
    const inputRef = useRef(null);
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Close on Escape key press
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    const handleItemClick = (item) => {
        onClose();
        navigate("/result", {
            state: {
                data: item.data,
                concept: item.concept,
                level: item.level
            }
        });
    };

    const handleDelete = (id) => {
        deleteFromHistory(id);
    };

    const handleClearAll = () => {
        if (window.confirm("Are you sure you want to clear your search history?")) {
            clearHistory();
        }
    };

    const formatTime = (isoString) => {
        try {
            const date = new Date(isoString);
            const now = new Date();
            const diffMs = now - date;
            const diffMins = Math.floor(diffMs / 60000);

            if (diffMins < 1) return "Just now";
            if (diffMins < 60) return `${diffMins}m ago`;

            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) return `${diffHours}h ago`;

            return date.toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit"
            });
        } catch {
            return "";
        }
    };

    const filteredHistory = history.filter(item =>
        item.concept.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* Backdrop overlay */}
            <div 
                className={`drawer-overlay ${isOpen ? "open" : ""}`} 
                onClick={onClose}
            />

            {/* Slide-out Sidebar Drawer */}
            <div 
                ref={drawerRef}
                className={`history-drawer ${isOpen ? "open" : ""}`}
                role="dialog"
                aria-label="Recent Explanations Drawer"
            >
                {/* Drawer Header */}
                <div className="drawer-header">
                    <h2>Recent Searches</h2>
                    <button 
                        className="close-drawer-btn" 
                        onClick={onClose} 
                        aria-label="Close drawer"
                    >
                        <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                </div>

                {/* Search Bar (Only display if there's history or search query) */}
                {(history.length > 0 || searchQuery) && (
                    <div className="drawer-search">
                        <div className="search-input-wrapper">
                            <svg className="search-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Filter previous concepts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                maxLength={50}
                            />
                            {searchQuery && (
                                <button 
                                    className="clear-search-btn" 
                                    onClick={() => setSearchQuery("")}
                                    aria-label="Clear filter"
                                >
                                    &times;
                                </button>
                            )}
                        </div>
                    </div>
                )}

                {/* Drawer Body - Scrollable content */}
                <div className="drawer-body">
                    {filteredHistory.length === 0 ? (
                        <div className="empty-history-container">
                            <div className="empty-icon-wrapper">
                                <svg className="empty-icon" viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <p className="empty-title">{searchQuery ? "No matching searches" : "No searches yet"}</p>
                            <p className="empty-subtitle">
                                {searchQuery 
                                    ? "Try refining your query to find matching concepts." 
                                    : "Explanations you generate will be saved here for instant offline access."
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="history-list">
                            {filteredHistory.map((item) => (
                                <div 
                                    key={item.id} 
                                    className="history-card"
                                    onClick={() => handleItemClick(item)}
                                >
                                    <div className="card-header">
                                        <span className={`level-badge badge-${item.level}`}>{item.level}</span>
                                        <span className="card-time">{formatTime(item.timestamp)}</span>
                                    </div>
                                    <div className="card-title">{item.concept}</div>
                                    <div className="card-snippet">
                                        {item.data?.definition || "Concept successfully deconstructed."}
                                    </div>
                                    <button 
                                        className="delete-card-btn" 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDelete(item.id);
                                        }}
                                        title="Delete from history"
                                        aria-label={`Delete ${item.concept} from history`}
                                    >
                                        <svg className="trash-icon" viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="3 6 5 6 21 6"></polyline>
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Drawer Footer (Only visible if there is history) */}
                {history.length > 0 && (
                    <div className="drawer-footer">
                        <button 
                            className="clear-all-btn" 
                            onClick={handleClearAll}
                        >
                            <svg className="clear-icon" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                                <line x1="9" y1="9" x2="15" y2="15"></line>
                                <line x1="15" y1="9" x2="9" y2="15"></line>
                            </svg>
                            Clear All History
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default HistoryDrawer;
