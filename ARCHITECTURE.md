# FirePRD Architecture

This document describes the architecture of the FirePRD framework.

## Overview

FirePRD is a prompt-based framework that uses a **stateful, user-directed workflow** to generate human-centric PRDs from source code. The framework is **resumable** and uses a **multi-persona architecture** for different stages of the process.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                     FirePRD CLI                         │
│                   (src/cli.js)                          │
└────────────────────┬────────────────────────────────────┘
                     │
                     v
┌─────────────────────────────────────────────────────────┐
│                 FirePRDAgent                            │
│            (Central Orchestrator)                       │
│                                                         │
│  - Manages workflow execution                          │
│  - Coordinates personas                                │
│  - Handles state persistence                           │
└──────┬──────────────────────────────────────┬──────────┘
       │                                       │
       v                                       v
┌─────────────────┐                   ┌──────────────────┐
│ WorkflowManager │                   │  StateManager    │
│                 │                   │                  │
│ - Step tracking │                   │ - Save state     │
│ - Progress mgmt │                   │ - Load state     │
│ - Data storage  │                   │ - Resumability   │
└─────────────────┘                   └──────────────────┘
       │
       │  Controls workflow steps
       v
┌─────────────────────────────────────────────────────────┐
│                  Workflow Steps                         │
│                                                         │
│  1. Analysis    →  2. Structure  →  3. Content  →      │
│     4. Generation  →  5. Complete                      │
└──────┬──────────────────────────────────────┬──────────┘
       │                                       │
       v                                       v
┌──────────────────┐                ┌──────────────────────┐
│ CodeAnalyst      │                │ PRDWriter            │
│ Persona          │                │ Persona              │
│                  │                │                      │
│ Step 1:          │                │ Steps 2-4:           │
│ - Analyze code   │                │ - Define structure   │
│ - Find features  │                │ - Generate content   │
│ - Identify deps  │                │ - Compile PRD        │
│ - Tech stack     │                │ - User collaboration │
└──────────────────┘                └──────────────────────┘
```

## Component Details

### 1. FirePRDAgent (Central Orchestrator)

**Location**: `src/agents/FirePRDAgent.js`

**Responsibilities**:
- Initialize or resume workflow
- Execute workflow steps sequentially
- Switch between personas based on current step
- Manage state persistence
- Provide workflow status

**Key Methods**:
- `start()`: Initialize or resume workflow
- `executeWorkflow()`: Execute current step
- `performAnalysis()`: Run analysis phase (Code Analyst)
- `collaborateOnStructure()`: Run structure phase (PRD Writer)
- `collaborateOnContent()`: Run content phase (PRD Writer)
- `generatePRD()`: Run generation phase (PRD Writer)
- `saveState()`: Persist workflow state

### 2. Code Analyst Persona

**Location**: `src/personas/CodeAnalystPersona.js`

**Responsibilities**:
- Automated code analysis
- Extract project structure
- Identify dependencies
- Detect features
- Determine tech stack

**Output**: Comprehensive project analysis object

### 3. PRD Writer Persona

**Location**: `src/personas/PRDWriterPersona.js`

**Responsibilities**:
- Propose document structure
- Generate section content
- Collaborate with user (future: interactive mode)
- Compile final PRD document

**Output**: Structured PRD in markdown format

### 4. Workflow Manager

**Location**: `src/workflow/WorkflowManager.js`

**Responsibilities**:
- Track current workflow step
- Manage step transitions
- Store step data
- Calculate progress
- Provide state for persistence

**Workflow Steps**:
1. `analysis` - Automated code analysis
2. `structure` - Define PRD structure
3. `content` - Generate section content
4. `generation` - Compile final document
5. `complete` - Workflow finished

### 5. State Manager

**Location**: `src/state/StateManager.js`

**Responsibilities**:
- Save workflow state to disk
- Load workflow state from disk
- Enable resumability
- Clear state when needed

**State File**: `.fireprd-state.json` (JSON format)

### 6. Prompt Generator

**Location**: `src/prompts/PromptGenerator.js`

**Responsibilities**:
- Generate prompts for LLM interactions (future enhancement)
- Template management
- Context preparation

**Note**: Currently a placeholder for future LLM integration

## Data Flow

```
1. User starts FirePRD
   ↓
2. FirePRDAgent checks for saved state
   ↓
3. If state exists → Resume from saved step
   If no state → Start new workflow
   ↓
4. Execute current step with appropriate persona:
   
   Step 1 (Analysis):
   User Project → CodeAnalyst → Analysis Data
   
   Step 2 (Structure):
   Analysis Data → PRDWriter → Structure
   
   Step 3 (Content):
   Analysis + Structure → PRDWriter → Content
   
   Step 4 (Generation):
   All Data → PRDWriter → Final PRD
   ↓
5. Save state after each step
   ↓
6. Move to next step or complete
   ↓
7. Output PRD.md file
```

## State Persistence

The framework saves state after each step completion:

```json
{
  "currentStep": "structure",
  "currentStepIndex": 1,
  "stepData": {
    "analysis": { /* analysis results */ },
    "structure": { /* structure definition */ }
  },
  "initialized": true
}
```

This enables:
- **Resumability**: Continue from any step
- **Durability**: Survive process interruptions
- **Debugging**: Inspect workflow state

## Extensibility

The architecture is designed for extension:

1. **Add new personas**: Implement new persona classes
2. **Add workflow steps**: Extend WorkflowManager with new steps
3. **Custom state storage**: Implement StateManager interface
4. **LLM integration**: Enhance PromptGenerator for AI interactions
5. **Interactive mode**: Add user input handling in personas

## Usage Patterns

### CLI Usage
```bash
fireprd --path ./my-project
```

### Programmatic Usage
```javascript
const agent = new FirePRDAgent('./project');
const result = await agent.start();
```

### Resume Interrupted Workflow
```bash
# First run (interrupted)
fireprd
^C

# Resume automatically
fireprd
```

## Design Principles

1. **Separation of Concerns**: Each component has a single responsibility
2. **Stateful**: Workflow state is always persisted
3. **Resumable**: Can stop and continue at any point
4. **Extensible**: Easy to add new features and personas
5. **User-Directed**: User maintains control over the process
6. **Automated Where Possible**: Reduces manual work

## Future Enhancements

Potential future additions:
- Interactive user input during structure/content phases
- LLM integration for enhanced analysis
- Multiple output formats (PDF, HTML, etc.)
- Custom templates and sections
- Multi-project analysis
- Comparison with existing PRDs
- Version control integration
