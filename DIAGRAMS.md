# Curator AI: UML & Database Diagrams

This document contains the structural, behavioral, and database modeling diagrams for the **Concept Explainer (Curator AI)** application using Mermaid.

---

## 1. Entity Relationship Diagram (ERD)
The ERD shows how data is structured on the client side inside `localStorage` to cache responses, prevent redundant API calls, and render the history items.

```mermaid
erDiagram
    HISTORY_ITEM {
        string id PK "Unique timestamp ID"
        string concept "Concept name (e.g. Recursion)"
        string level "Learner difficulty level"
        datetime timestamp "Time of search creation"
    }
    EXPLANATION_DATA {
        string definition "Concept detailed definition"
        string analogy "Detailed real-world narrative analogy"
    }
    PRINCIPLE {
        string description "Elaborated key technical principle text"
    }
    APPLICATION {
        string description "Real-world domain use case text"
    }

    HISTORY_ITEM ||--|| EXPLANATION_DATA : "caches"
    EXPLANATION_DATA ||--|{ PRINCIPLE : "contains (exactly 2)"
    EXPLANATION_DATA ||--|{ APPLICATION : "contains (exactly 2)"
```

---

## 2. UML Diagrams

### 2.1. Use Case Diagram
The Use Case Diagram displays actor interaction boundaries with the frontend interface (drawer, forms, results dashboard) and the backend query limits.

```mermaid
graph TD
    User((Learner / User)) 

    subgraph Frontend Application Client
        UC1[Enter Concept & Depth Level]
        UC2[View Explanation Dashboard]
        UC3[Generate Alternative Analogy]
        UC4[Open Search History Drawer]
        UC5[Filter Search History by Keyword]
        UC6[Restore Past Explanation Instantly]
        UC7[Delete Single History Item]
        UC8[Clear All Search History]
    end

    subgraph Backend Server / API
        UC1 -.->|triggers| API_Explain[POST /api/explain]
        UC3 -.->|triggers| API_Analogy[POST /api/analogy]
    end

    subgraph Local Storage
        UC1 -.->|creates| Cache[Write to Cache]
        UC6 -.->|reads| LoadCache[Read from Cache]
        UC7 -.->|modifies| DeleteCache[Remove from Cache]
        UC8 -.->|clears| ClearCache[Wipe Cache]
    end

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8
```

---

### 2.2. Sequence Diagram
The Sequence Diagram maps the lifecycle of a search submission, detailing request routing, matching braces JSON parsing, the model fallback loop, and client-side reactive events.

```mermaid
sequenceDiagram
    autonumber
    actor User
    participant UI as React UI (Home/Result)
    participant Cache as LocalStorage
    participant Server as Express Server (server.js)
    participant LLM as OpenRouter Models (Fallback Loop)

    User->>UI: Enters concept, selects level, clicks Submit
    UI->>UI: Set isLoading = true (renders LoadingScreen)
    UI->>Server: POST /api/explain { concept, level }
    
    loop Fallback List (Resilient Parse & Validate)
        Server->>LLM: Fetch chat completion (Model N)
        LLM-->>Server: Return raw JSON text response
        Note over Server: Match Braces & run jsonrepair()
        alt Parsing & Validation Successful
            Note over Server: Verify fields: definition, principles, applications, analogy
        else Parse/Repair Fails
            Note over Server: Log warning, try next fallback model (Model N+1)
        end
    end
    
    Server-->>UI: Return 200 OK (Clean parsed JSON)
    UI->>Cache: saveToHistory(concept, level, data)
    Cache-->>UI: Dispatch custom "historyUpdated" window event
    UI->>UI: Set isLoading = false, navigate("/result", state)
    UI-->>User: Render Dashboard view (definition, principles, applications, analogy)
    
    User->>UI: Click "Try Another Analogy"
    UI->>Server: POST /api/analogy { concept, level }
    Server->>LLM: Fetch new analogy prompt
    LLM-->>Server: Return analogy JSON text
    Server-->>UI: Return 200 OK (Clean analogy JSON)
    UI->>Cache: updateHistoryAnalogy(concept, level, newAnalogy)
    UI-->>User: Refresh & render updated analogy
```

---

### 2.3. Class / Component Diagram
This diagram represents the structural layout of the React client components, routing links, storage utility methods, and their associations.

```classDiagram
    class App {
        +render() Routes
    }
    class Home {
        -isLoading: boolean
        +render() JSX
    }
    class Result {
        -analogy: string
        -isGenerating: boolean
        +handleGenerateNewAnalogy() void
        +render() JSX
    }
    class Header {
        -isDrawerOpen: boolean
        +setIsDrawerOpen(state) void
        +render() JSX
    }
    class HistoryDrawer {
        -history: Array~HistoryItem~
        -searchQuery: string
        +handleItemClick(item) void
        +handleDelete(id) void
        +handleClearAll() void
        +render() JSX
    }
    class Main {
        -level: string
        -concept: string
        +handleSubmit() void
        +render() JSX
    }
    class InputForm {
        +currentLevel: string
        +setCurrentLevel() void
        +setConcept() void
        +handleSubmit() void
        +render() JSX
    }
    class HistoryUtility {
        <<utility>>
        +getHistory() Array
        +saveToHistory(concept, level, data) void
        +updateHistoryAnalogy(concept, level, newAnalogy) void
        +deleteFromHistory(id) void
        +clearHistory() void
    }

    App --> Home : routes to
    App --> Result : routes to
    Home --> Header : renders
    Home --> Main : renders
    Result --> Header : renders
    Main --> InputForm : renders
    Header --> HistoryDrawer : mounts & triggers
    Main ..> HistoryUtility : uses
    Result ..> HistoryUtility : uses
    HistoryDrawer ..> HistoryUtility : uses
```

---

### 2.4. Activity / State Diagram
The Activity Diagram details the algorithmic flow of user inputs, validations, loading transitions, fallback exceptions, and cached page restoring.

```mermaid
stateDiagram-v2
    [*] --> HomeInput : App opens on landing page
    HomeInput --> ValidateInput : Click "Explain Concept"
    
    state ValidateInput <<choice>>
    ValidateInput --> ShowAlert : concept string is empty
    ValidateInput --> TriggerFetch : concept is provided
    
    ShowAlert --> HomeInput : Prompt User
    
    state TriggerFetch {
        [*] --> ShowLoading : Render LoadingScreen
        ShowLoading --> PostRequest : Send POST to /api/explain
        PostRequest --> ModelResponse : Query Fallback LLM List
        
        state CheckResponse <<choice>>
        ModelResponse --> CheckResponse : Settle text & attempt parse/repair
        CheckResponse --> SaveSuccess : Parse Successful
        CheckResponse --> TryNextModel : Parse/Validation Failed
        
        TryNextModel --> ModelResponse : Try next fallback API key/model
        TryNextModel --> ErrorScreen : Exhausted fallback list (Error alert)
    }
    
    SaveSuccess --> WriteCache : Call saveToHistory()
    WriteCache --> NotifyListeners : Dispatch "historyUpdated" Event
    NotifyListeners --> RedirectResult : Navigate to /result
    RedirectResult --> RenderDashboard : Load state content
    
    RenderDashboard --> TriggerAnalogy : Click "Try Another Analogy"
    TriggerAnalogy --> FetchAnalogy : POST /api/analogy
    FetchAnalogy --> UpdateCache : Call updateHistoryAnalogy()
    UpdateCache --> RenderDashboard : Update Analogy card UI
    
    RenderDashboard --> [*] : User exits app / returns home
```
