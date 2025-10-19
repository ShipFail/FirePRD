```mermaid
graph TD
  subgraph User_Commands["User Commands"]
    A["1. Activate /fireprd"]
    B["2. Run *start &lt;path&gt;"]
    E["4. Run *analyze"]
  end

  subgraph FirePRD_Agent["FirePRD Agent (Internal Workflow)"]
    C["fireprd Agent Orchestrator"]
    Z["workflow-state.yaml"]
    H["Creates code-analysis.md"]
    L["Collaborates with User & Generates PRD"]

    C -->|Manages| Z
    C -->|Adopts code-analyst persona| H
    H -->|Updates| Z
    C -->|Adopts prd-writer persona| L
    L -->|Updates| Z
  end

  A --> C
  B --> C
  E --> C

  style Z fill:#f9ab00,stroke:#333,stroke-width:2px,color:#fff
```
