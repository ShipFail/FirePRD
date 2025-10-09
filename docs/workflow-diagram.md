# FirePRD Workflow Diagram

## Visual Workflow

```
┌─────────────────────────────────────────────────────────────────────┐
│                         🔥 FirePRD                                  │
│              Transforms Code into Product Documentation             │
└─────────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
                    ┌──────────────────────────┐
                    │   Check for saved state  │
                    │  (.fireprd-state.json)   │
                    └──────────┬───────────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
         ┌──────────┐                  ┌──────────┐
         │ Resume   │                  │  Start   │
         │ Workflow │                  │   New    │
         └────┬─────┘                  └────┬─────┘
              │                             │
              └──────────────┬──────────────┘
                             ▼
        ┌────────────────────────────────────────────┐
        │     STEP 1: ANALYSIS (Automated)           │
        │     Persona: 📊 Code Analyst               │
        ├────────────────────────────────────────────┤
        │  • Scan project structure                  │
        │  • Identify dependencies                   │
        │  • Extract features                        │
        │  • Determine tech stack                    │
        │                                            │
        │  Output: Comprehensive analysis data       │
        └─────────────────┬──────────────────────────┘
                          │ [Save State]
                          ▼
        ┌────────────────────────────────────────────┐
        │   STEP 2: STRUCTURE (Collaborative)        │
        │   Persona: ✏️  PRD Writer                  │
        ├────────────────────────────────────────────┤
        │  • Propose document structure              │
        │  • Define sections based on analysis       │
        │  • Present structure to user               │
        │                                            │
        │  Output: PRD structure definition          │
        └─────────────────┬──────────────────────────┘
                          │ [Save State]
                          ▼
        ┌────────────────────────────────────────────┐
        │   STEP 3: CONTENT (Collaborative)          │
        │   Persona: ✏️  PRD Writer                  │
        ├────────────────────────────────────────────┤
        │  • Generate content for each section       │
        │  • Draft based on analysis                 │
        │  • Present for user refinement             │
        │                                            │
        │  Output: Section content                   │
        └─────────────────┬──────────────────────────┘
                          │ [Save State]
                          ▼
        ┌────────────────────────────────────────────┐
        │   STEP 4: GENERATION (Automated)           │
        │   Persona: ✏️  PRD Writer                  │
        ├────────────────────────────────────────────┤
        │  • Compile all sections                    │
        │  • Format as markdown                      │
        │  • Add metadata and styling                │
        │                                            │
        │  Output: Final PRD document                │
        └─────────────────┬──────────────────────────┘
                          │ [Save State]
                          ▼
        ┌────────────────────────────────────────────┐
        │         🎉 COMPLETE                        │
        │                                            │
        │    PRD.md saved to project directory       │
        └────────────────────────────────────────────┘
```

## State Persistence Flow

```
Each Step:
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│   Execute   │ --> │  Save Data   │ --> │ Save State  │
│    Step     │     │   to Memory  │     │   to Disk   │
└─────────────┘     └──────────────┘     └─────────────┘
                                                 │
                                                 ▼
                                        .fireprd-state.json
                                                 │
                                                 ▼
                                          [Resumable]
```

## Persona Switching

```
Workflow Steps:            Active Persona:
─────────────────         ──────────────────

Step 1: Analysis      →   📊 Code Analyst
                          (Automated analysis)

Step 2: Structure     →   ✏️  PRD Writer
Step 3: Content       →   ✏️  PRD Writer
Step 4: Generation    →   ✏️  PRD Writer
                          (Document creation)

Step 5: Complete      →   (No active persona)
```

## Data Flow Through Steps

```
┌──────────────┐
│ Source Code  │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│   Code Analyst           │
│   analyzeProject()       │
└──────┬───────────────────┘
       │
       │ Analysis Data:
       │ {
       │   structure: {...},
       │   dependencies: {...},
       │   features: [...],
       │   techStack: {...}
       │ }
       │
       ▼
┌──────────────────────────┐
│   PRD Writer             │
│   proposeStructure()     │
└──────┬───────────────────┘
       │
       │ Structure:
       │ {
       │   sections: [
       │     {title, description},
       │     ...
       │   ]
       │ }
       │
       ▼
┌──────────────────────────┐
│   PRD Writer             │
│   generateContent()      │
└──────┬───────────────────┘
       │
       │ Content:
       │ {
       │   sections: [
       │     {title, content},
       │     ...
       │   ]
       │ }
       │
       ▼
┌──────────────────────────┐
│   PRD Writer             │
│   compilePRD()           │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│   Final PRD Document     │
│   (Markdown format)      │
└──────────────────────────┘
```

## Resumability Example

```
Session 1 (Interrupted):
─────────────────────────
Start → Analysis ✓ → Structure ✓ → [Ctrl+C]
                                     ^
                                     │
                            State saved here

Session 2 (Resumed):
────────────────────
Resume from state → Structure → Content ✓ → Generation ✓ → Complete ✓
```

## Key Features Illustrated

1. **🔄 Stateful**: Each step saves progress
2. **🎯 Resumable**: Can continue from any step
3. **👥 Multi-Persona**: Different personas for different tasks
4. **🤝 User-Directed**: User controls the workflow
5. **🤖 Automated**: Code analysis happens automatically
6. **📝 Collaborative**: Document creation can involve user input

## Command Examples

```bash
# Start new workflow
$ fireprd --path ./my-project
🔥 Starting new FirePRD workflow

# Resume interrupted workflow
$ fireprd --path ./my-project
🔥 Resuming FirePRD workflow from step: structure

# Check version
$ fireprd --version
FirePRD v1.0.0
```
