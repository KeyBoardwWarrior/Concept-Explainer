const HISTORY_KEY = "concept_explainer_history";
const MAX_HISTORY_ITEMS = 25;

export const getHistory = () => {
    try {
        const stored = localStorage.getItem(HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (e) {
        console.error("Failed to parse search history:", e);
        return [];
    }
};

export const saveToHistory = (concept, level, data) => {
    try {
        let history = getHistory();
        
        // Remove duplicate concept+level if exists to put it at top
        history = history.filter(
            item => !(item.concept.toLowerCase() === concept.toLowerCase() && item.level === level)
        );

        const newItem = {
            id: Date.now().toString(),
            concept,
            level,
            data,
            timestamp: new Date().toISOString()
        };

        history.unshift(newItem);

        if (history.length > MAX_HISTORY_ITEMS) {
            history = history.slice(0, MAX_HISTORY_ITEMS);
        }

        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        
        // Dispatch custom event to notify listeners
        window.dispatchEvent(new Event("historyUpdated"));
    } catch (e) {
        console.error("Failed to save to history:", e);
    }
};

export const updateHistoryAnalogy = (concept, level, newAnalogy) => {
    try {
        let history = getHistory();
        const item = history.find(
            item => item.concept.toLowerCase() === concept.toLowerCase() && item.level === level
        );
        if (item) {
            item.data = { ...item.data, analogy: newAnalogy };
            localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
            window.dispatchEvent(new Event("historyUpdated"));
        }
    } catch (e) {
        console.error("Failed to update analogy in history:", e);
    }
};

export const deleteFromHistory = (id) => {
    try {
        let history = getHistory();
        history = history.filter(item => item.id !== id);
        localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
        window.dispatchEvent(new Event("historyUpdated"));
    } catch (e) {
        console.error("Failed to delete from history:", e);
    }
};

export const clearHistory = () => {
    try {
        localStorage.removeItem(HISTORY_KEY);
        window.dispatchEvent(new Event("historyUpdated"));
    } catch (e) {
        console.error("Failed to clear history:", e);
    }
};
