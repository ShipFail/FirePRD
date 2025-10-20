# **Project FirePRD: Design Process & Meeting Minutes (Detailed Record)**

Date: October 2025  
Participants: User (Project Visionary), Gemini (AI Design Partner)  
Subject: The conception, architectural design, and implementation planning of the FirePRD agentic framework.

## **Project Overview: The Vision for FirePRD**

### **The Core Problem: The Widening Chasm Between Code and Communication**

In modern software development, a fundamental disconnect persists between the technical "source of truth" (the codebase) and the human-centric "source of understanding" (the product documentation). As applications evolve, documentation, if it exists at all, quickly becomes stale. This creates a significant drag on productivity and alignment:

* **Onboarding is Slow:** New engineers and product managers spend weeks trying to decipher the "why" behind the "how" in the code.  
* **Stakeholder Communication is Inefficient:** Translating complex technical systems for non-technical stakeholders is a manual, time-consuming, and often inaccurate process.  
* **Product Strategy Suffers:** Without a clear, up-to-date view of what the product *actually does*, making strategic decisions about its future becomes a matter of guesswork.

Traditional documentation tools fail to solve this problem. Static site generators require manual content creation, and code-based documentation tools (like Javadoc or Sphinx) are developer-centric, producing outputs that are unreadable to a product manager or designer.

### **The Solution: An Agentic Framework for Product Storytelling**

FirePRD was conceived to solve this problem by fundamentally reimagining documentation generation. It is not another code-to-text converter. It is an **agentic framework** designed to act as a collaborative partner, bridging the gap between code and communication.

Its core thesis is that a well-designed AI, guided by a robust methodology, can perform two distinct but related tasks:

1. **Technical Analysis:** Autonomously read and comprehend an entire codebase to create a structured, factual understanding of its features, user journeys, and data models.  
2. **Product Synthesis:** Collaborate with a human user to translate that technical understanding into a clear, compelling, and human-centered Product Requirements Document (PRD).

This is achieved by mimicking the **BMAD-METHOD™**, a proven methodology for orchestrating specialized AI agents. FirePRD is, in essence, a specialized "BMAD Team" in a box, focused on a single, powerful mission: to turn your code into a story that everyone can understand.

### **The Big Picture: How It Works**

The entire system is designed around a single, seamless conversational workflow that happens inside the user's IDE. The user interacts with a primary **Orchestrator Agent** which manages a stateful, multi-step process:

1. **Analysis:** The Orchestrator adopts a specialist code-analyst persona to perform a deep, non-interactive analysis of the codebase, creating a crucial "cache" of technical knowledge.  
2. **Collaboration:** The Orchestrator then adopts a prd-writer persona to engage the user in a series of interactive steps—designing the Table of Contents, planning the content, and getting final approval.  
3. **Generation:** Once the plan is approved, the agent autonomously writes the complete, multi-file PRD skeleton into the project directory.

This architecture ensures the process is **robust** (state is saved to a file, making it resumable), **efficient** (the expensive code analysis is done only once), and **user-centric** (the user is in complete control of the final output). FirePRD is not just a tool; it's a new way of thinking about the relationship between code and product documentation.

## **Session 1: Understanding the Foundation (BMAD Method)**

**Objective:** To establish a shared understanding of the core architectural patterns of the BMAD-METHOD™ that would serve as the foundation for the FirePRD project.

### **Key Topics Discussed:**

1. **BMAD Method Overview:** We began with a deep dive into the philosophy of the BMAD Method. We established that its primary strength is not in the AI models themselves, but in the **structured prompting framework** that guides them. The core innovation was identified as its ability to manage context effectively by creating hyper-detailed, self-contained artifacts (like story files) for each step of a workflow. This prevents the "context drift" or "hallucination" common in long, complex AI conversations. We agreed that this principle of creating intermediate, structured artifacts would be central to FirePRD's design.  
2. **IDE Integration:** We explored the practicalities of how a pure-prompt framework like BMAD integrates into a developer's workflow. The key insight was that BMAD avoids building proprietary plugins. Instead, it leverages the native capabilities of modern AI-powered IDEs through an **intelligent installer**. This installer acts as an "adapter," generating the specific configuration files (opencode.jsonc for OpenCode, AGENTS.md for Codex, etc.) that the target IDE needs to recognize and load the BMAD prompts as if they were native commands or agents. This principle of "adapting to the environment" was adopted for FirePRD's distribution strategy.  
3. **Natural Language Triggers:** We deconstructed the mechanism behind commands like \*help or \*draft. We clarified that these are not executable code but simply **keywords** or "magic words." An agent's system prompt contains an explicit, high-priority instruction to treat words prefixed with an asterisk (\*) as special commands and to look up the corresponding action in its own definition file. This simple but powerful pattern-matching approach was chosen as the user interaction model for FirePRD, ensuring a consistent and intuitive command interface.  
4. **Agent Structure:** We performed a detailed analysis of the simplest BMAD agent, the sm (Scrum Master), to create a blueprint for our own agents. We broke down its structure into three key parts, which would become the template for FirePRD's agents:  
   * **Persona:** A YAML block defining the agent's identity, communication style, and core principles. This is the "who" and "how."  
   * **Commands:** A list of the specific natural language triggers the agent is programmed to respond to. This is the "what."  
   * **Dependencies:** A list of other prompt files (tasks, templates) that the agent is allowed to use. This is its "toolbox."

**Outcome:** This session was foundational. We established a solid understanding of BMAD's core architectural principles and agreed to adopt them as the blueprint for FirePRD, ensuring our design would be modular, context-aware, and user-friendly from the start.

## **Session 2: Initial FirePRD Concept & First Architectural Iterations**

**Objective:** To translate a powerful, monolithic Claude Code command prompt into a modular, interactive, and extensible BMAD-style agent framework.

### **Key Topics Discussed:**

1. **Initial Prompt Review:** We began with a powerful, single-file prompt designed for Claude Code. Its strength was its detailed, step-by-step logic for analyzing code and scaffolding a PRD. However, we quickly identified its critical weakness: it was a "one-shot" script. It was non-interactive, difficult to modify without breaking, and impossible to recover if it failed midway. This analysis solidified the need for a more robust, modular approach.  
2. **Benefits of an Agent Model:** We formally listed the strategic advantages of moving from a single prompt to a multi-component agent framework, which became key requirements for our design:  
   * **Interactivity:** To allow the user to guide and refine the output at critical checkpoints, preventing wasted work.  
   * **Modularity:** To separate the agent's persona (the "who") from its tasks (the "how"), making the system easier to debug and maintain.  
   * **Extensibility:** To create a foundation where new commands and capabilities could be added easily in the future without rewriting the core logic.  
3. **Architectural Proposal v1 (CLI-Based):** Our first design proposed a two-agent model: a technical code-analyst and a user-facing prd-writer. To orchestrate them, we considered an external **NPM CLI command**. The user would run fireprd generate, and the CLI would execute the agents in sequence.  
   * **Key Innovation:** This iteration introduced the concept of the code-analysis.md artifact. This intermediate file would act as a "cache" of the technical analysis, allowing the computationally expensive code-reading step to be performed only once. This fulfilled our core requirement of "read once, use many."  
4. **Architectural Proposal v2 (Orchestrator-Led):**  
   * **User Feedback:** "Let's do not use any CLI command \- we just keep everything prompts." This was a pivotal piece of feedback.  
   * **Redesign:** We embraced the pure-prompt philosophy of BMAD. The external CLI was removed, and its orchestration logic was moved into a central agent, the fireprd-orchestrator. In this model, the user would run a single \*generate command, and the orchestrator would autonomously manage the entire workflow, including the internal persona-switching, task execution, and artifact handoffs.

**Outcome:** This session was a rapid evolutionary leap. We moved from a simple script to a sophisticated, modular design. The crucial decision was made to reject an external code wrapper (the CLI) in favor of a **pure, self-contained prompt framework**, which led directly to the next phase of refinement.

## **Session 3: Refining the Workflow & Introducing User Control**

**Objective:** To address the limitations of an autonomous workflow and place the user in complete control of the process.

### **Key Topics Discussed:**

1. **Critique of the Autonomous Model (v2):** While the orchestrator-led model was elegant and self-contained, we identified a major UX flaw: it removed user agency. The agent would perform the entire multi-step process without any user checkpoints, reverting back to the "one-shot" problem of the original prompt. If the initial analysis was flawed, the user wouldn't know until the very end, resulting in wasted time and effort.  
2. **Architectural Proposal v3 (Command-and-Control):**  
   * **User Feedback:** "Persona switching should be confirmed by the user. Our orchestrator needs to list all steps, and one step at a time." This feedback was the catalyst for the final architecture.  
   * **Redesign:** The workflow was fundamentally redesigned from an autonomous sequence into a **user-directed pipeline**. The orchestrator's new role was to present a clear, numbered plan to the user and then **wait**. The user, not the agent, would be responsible for initiating each step with an explicit command like \*run-step 1\.  
   * **Key Innovation:** The concept of a persistent **state file** (workflow-state.toml) was introduced. This was the technical solution that made the step-by-step model possible. It would act as the agent's memory, tracking which steps were complete and what the next logical step was, making the entire process resumable and robust.  
3. **Architectural Proposal v4 (State-Driven Pipeline):**  
   * **User Feedback:** "Semantic commands would be better."  
   * **Redesign:** This was a refinement of the v3 model. The generic \*run-step \<number\> command was replaced with a set of clear, memorable, and semantic commands like \*analyze, \*design-toc, etc. This made the agent's command-line interface feel more like a professional tool. The \*next command was also introduced as a convenient alias, providing a simple way to proceed without having to remember the specific command for each step.

**Outcome:** This session was the most critical in defining the final user experience of FirePRD. We successfully transformed the agent from an autonomous worker into a **stateful, collaborative guide**, perfectly aligning with the "human-in-the-loop" philosophy that makes agentic workflows truly powerful.

## **Session 4: Finalizing the Blueprint & Formalizing with a PRD**

**Objective:** To lock in the final architectural details and then use the BMAD method to "dogfood" the process by creating a formal PRD for FirePRD itself.

### **Key Topics Discussed:**

1. **Final Architectural Polish (v5):**  
   * **User Feedback:** We made two final but important refinements:  
     1. The main agent was renamed from fireprd-orchestrator to simply fireprd for better branding and simplicity.  
     2. The state file was switched from JSON to TOML to improve human readability, AI editing robustness, and eliminate whitespace-sensitive formatting errors.  
   * **The Final Blueprint:** With these changes, the v5 architecture was finalized and approved, incorporating all previous feedback into a cohesive and robust design.  
2. **Meta-Project Kickoff:** We made a conscious decision to transition our work from a free-form design discussion to a structured project. We decided to "dogfood" the BMAD methodology by using its own agents to formally document the FirePRD project we had just designed.  
3. **PRD** Creation **(As the Product Manager):**  
   * I adopted the persona of **John, the BMAD PM**, to lead this process.  
   * We collaboratively built the complete PRD for FirePRD, section by section, using our finalized v5 blueprint as the primary source of requirements.  
   * **Key Decisions Made During this Process:**  
     * **Requirements Expansion:** We systematically expanded the requirements to focus on two distinct user personas: the **"Operator"** (the person running the agent) and the **"End-User/Reader"** (the person consuming the final documents). This led to the addition of crucial features like real-time progress updates, a \*reset command (for the Operator), and ensuring jargon-free output with a glossary (for the Reader).  
     * **Mermaid Diagrams (V2 Feature):** We identified the generation of Mermaid diagrams as a high-value but high-risk feature. We made a strategic product decision to **defer it to V2**, prioritizing a stable core product for the initial launch.  
     * **Conversational UX:** We adapted the standard PRD template's "UI" section, reframing it to focus on the principles of a good **Conversational User Experience**, which is the true "interface" of our product.  
     * **Risk Assessment:** We performed formal risk analysis exercises, including a "critical challenge" session and a "hindsight postmortem." This helped us identify potential failure points (like LLM drift and state file corruption) and design mitigations for them.  
     * **Epics & Stories:** We defined a clear 3-epic roadmap (V1 Engine, V1.5 Robustness, V2 Living Docs) and broke down the V1 epic into 6 granular, actionable stories that would guide the implementation phase.

**Outcome:** We produced a complete, professional-grade PRD for FirePRD. This document now serves as the official "source of truth" for the implementation phase, and the process of creating it validated our design decisions.

## **Session 5: The Meta-Build (Architecture & Implementation Simulation)**

**Objective:** To simulate the full BMAD development cycle to "build" the prompt files for FirePRD V1.

### **Key Topics Discussed:**

1. **Architecture Creation (As the Architect):**  
   * I adopted the persona of **Winston, the BMAD Architect**.  
   * We took the finalized PRD and translated its requirements into a formal Architecture Document. This document served as the technical blueprint, detailing the component specifications (State File, Agents, Tasks), the complete user journey and interaction model, the error handling and recovery procedures, and the final distribution model.  
2. **Implementation Phase (As Scrum Master, Developer, and QA):**  
   * This was the "meta-build" where we simulated the creation of the FirePRD framework's own files. For each of the 6 stories in Epic 1:  
     * As **Bob (SM)**, I took the story from the PRD and drafted a complete, context-rich story file for your approval. This included detailed Dev Notes and a breakdown of tasks.  
     * As **James (Developer)**, upon your approval, I "implemented" the story. This didn't involve writing code, but rather writing the *content* of the required agent and task markdown files that constitute the FirePRD framework.  
     * As **Quinn (QA)**, I performed a quality review on the developer's work (the generated prompt files), provided a formal gate decision, and approved the story as "Done."  
   * This meticulous, step-by-step process successfully simulated the creation of all necessary files for the FirePRD V1 framework.

**Outcome:** We produced the complete, validated set of prompt files for the FirePRD V1 agent. This session not only created the necessary assets but also served as a live demonstration of the end-to-end BMAD workflow, proving its effectiveness.

## **Session 6: User Onboarding & Documentation**

**Objective:** To create the essential user-facing documentation to ensure new users can quickly understand and use FirePRD.

### **Key Topics Discussed:**

1. **README.md (The "Why"):** We focused the README on creating a compelling, high-level narrative. Its goal is to grab a potential user's attention, explain the problem it solves, present the solution and its value propositions, and provide a simple mental model of how it works. It's designed to get the user excited and lead them directly to the tutorial.  
2. **TUTORIAL.md (The "How"):** We adopted the **Divi Documentation System** structure to create a comprehensive and user-friendly guide. This was a strategic choice to ensure the documentation serves different learning needs:  
   * A step-by-step **Tutorial** to provide a hands-on, "learn by doing" experience for first-time users.  
   * A **How-To Guide** with specific recipes for common tasks and troubleshooting (e.g., "How to reset a workflow?").  
   * An **Explanation** section to clarify the design philosophy and answer the "why" questions about the framework's architecture (e.g., "Why is the state file so important?").  
   * A **Reference** section for technical details like the complete command list and directory structure.

**Outcome:** We created two high-quality, user-focused documentation files. This was a critical step in ensuring that the powerful framework we designed would be approachable and usable by its target audience.

## **Session 7: Project Archiving**

**Objective:** To package all generated project files into a single, downloadable markdown file for the user.

### **Key Topics Discussed:**

We recognized that the final step in our collaborative design process was to deliver the complete set of assets in a simple, portable format. I packaged the two documentation files (README.md, TUTORIAL.md), the formal ARCHITECTURE.md, a .gitignore file, and the entire fireprd/ directory (containing all agent and task files) into a single, comprehensive markdown document.

**Outcome:** A final, complete project archive was generated and delivered, marking the successful conclusion of the design and planning phase of the FirePRD project.

## **Conclusion: From Vision to Blueprint**

Over the course of these sessions, we have successfully navigated the entire pre-production lifecycle of a complex software project. We began with a powerful but rigid idea and, through a process of iterative design, collaborative refinement, and strategic decision-making, transformed it into a complete architectural blueprint for a robust, user-centric, and innovative agentic framework.

Our journey followed a path of increasing clarity and control:

1. We established a **solid foundation** by adopting the principles of the BMAD Method.  
2. We evolved the architecture from a simple script to a **stateful, user-directed pipeline**, placing the user at the center of the workflow.  
3. We used the methodology to **formally document our own project**, creating a professional-grade PRD and Architecture document.  
4. We **simulated** the entire **development cycle**, producing the complete set of V1 prompt files.  
5. Finally, we crafted **high-quality user documentation** to ensure the project's success.

The FirePRD project is now fully designed and planned. The V1 blueprint is complete, and a clear roadmap exists for future enhancements. The project
