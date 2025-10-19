# FirePRD: The Agentic PRD Generator

FirePRD is a pure prompt-based framework that turns your application's source code into a clear, human-centered Product Requirements Document (PRD). It uses a team of specialized AI agents, led by a central orchestrator, to analyze your code and collaborate with you to generate a well-structured, non-technical PRD.

## Features (V1)

- **Agent-Driven Analysis:** A specialist `code-analyst` agent reads your codebase to understand its features, user journeys, and data models.
- **Interactive & Collaborative:** A `prd-writer` agent works with you conversationally to design the Table of Contents and structure of your document.
- **Stateful & Resumable:** The entire workflow is managed via a state file (`workflow-state.yaml`), so you can stop and resume the process at any time.
- **User-Directed Workflow:** You are in control. The agent proposes a plan, but you execute each step with explicit commands.
- **Pure Prompt Framework:** FirePRD is a library of prompts designed to be run in any modern AI-powered IDE (like Claude Code, Cursor, etc.). It contains no compiled code.

## How It Works

1.  **Start:** You activate the `/fireprd` agent and run the `*start <path_to_code>` command.
2.  **Analyze:** You run `*analyze`. The agent autonomously analyzes your code and creates a technical summary artifact.
3.  **Collaborate:** You run `*design-toc`, `*plan-content`, and `*finalize-plan`. The agent collaborates with you to design the structure and content plan for your PRD.
4.  **Generate:** You run `*generate-all-chapters`. The agent writes the complete PRD skeleton into the `fireprd/` directory.

## Installation

1.  Clone or download this repository.
2.  Copy the entire `fireprd/` directory into the root of the project you wish to document.
3.  **(Recommended)** Add `fireprd/cache/` to your project's `.gitignore` file.
4.  Configure your IDE's AI chat to recognize the `/fireprd` command by pointing it to the `fireprd/agents/fireprd.md` file.

## Usage

In your IDE's AI chat panel:
1.  Type `/fireprd` to activate the agent.
2.  Follow the agent's guidance, starting with `*start .` to analyze the current directory.
