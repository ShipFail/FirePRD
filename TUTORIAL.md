# FirePRD Tutorial: From Zero to Your First PRD

Welcome! This tutorial will guide you through the process of installing FirePRD and using it to generate your first Product Requirements Document. We'll follow a real-world example to make it practical.

This document is structured using the [Divi Documentation System](https://diataxis.fr/), which includes four parts: a Tutorial, a How-To Guide, an Explanation, and a Reference.

---

## 1. The Tutorial (Let's Learn by Doing)

### Goal: Generate a PRD for a Sample Project

Our goal is to create a PRD for a simple "To-Do List" web application. By the end of this tutorial, you will have a `fireprd/` directory in your project containing the complete document.

#### **Step 0: Prerequisites & Installation**

1.  **Get an AI-Powered IDE:** FirePRD is a prompt framework and requires an environment that can run it, like Cursor or VS Code with a compatible AI extension.
2.  **Download FirePRD:** Clone or download the FirePRD repository.
3.  **Install:** Copy the `fireprd/` directory from the repository into the root of your "To-Do List" application's codebase.
4.  **Configure:** Follow your IDE's instructions to register a custom command. Create a command named `/fireprd` and point it to the `fireprd/agents/fireprd.md` file.

#### **Step 1: Start the Workflow**

In your IDE's chat panel, activate the agent. It will greet you and show you the available commands.

`
/fireprd
`

Now, let's start a new session. We'll tell FirePRD to analyze the code in the current directory (`.`).

`
*start .
`

The agent will confirm that it has created a `workflow-state.toml` file. This file is its memory.

#### **Step 2: Analyze the Codebase**

Next, we'll ask the agent to analyze the code.

`
*analyze
`

The agent will ask for your permission to switch to its `code-analyst` persona. This is a key design feature: you are always in control of the process. Type `yes` or `approve`. The agent will then read your code and create a `code-analysis.md` artifact in the cache.

#### **Step 3: Design the Table of Contents (TOC)**

Now for the fun part: collaboration. Let's design the document's structure.

`
*design-toc
`

The agent will switch to its `prd-writer` persona (after your approval) and propose a Table of Contents based on its analysis. It might look like this:

> **Agent:** Here is a proposed structure:
> * Part I: Core Functionality
>     * Chapter 1: User Authentication
>     * Chapter 2: To-Do Item Management
>
> What changes should we make?

Let's refine it. Tell the agent:

> **You:** That looks good, but let's add a chapter called "Task Filtering" to Part I.

The agent will update the TOC and present it again. Once you're happy with it, just say:

> **You:** Looks perfect, let's approve it.

The agent will save the final `toc.md` and tell you the next step.

#### **Step 4: Finalize the Plan & Generate!**

The next two steps are quick approval gates.

`
*plan-content
`

The agent will generate one-sentence summaries for each chapter.

`
*finalize-plan
`

The agent presents the full plan for your final approval. Type `approve`.

Now, the final command:

`
*generate-all-chapters
`

The agent will now write all the files for your PRD into the `fireprd/` directory. Congratulations! You've just generated your first PRD.

---

## 2. The How-To Guide (Specific Recipes)

* **How to reset a failed workflow?**
    If you get stuck or the state file gets corrupted, simply run the `*reset` command. It will ask for confirmation and then safely delete the `fireprd/cache` directory, allowing you to start fresh with `*start`.

* **How to generate chapters in parallel?**
    After you have a finalized plan (after `*finalize-plan`), you can speed up generation. Open multiple chat panels, activate `/fireprd` in each, and run `*generate-chapter ch_1`, `*generate-chapter ch_2`, etc., in parallel.

* **How to manually edit the plan?**
    The `workflow-state.toml` and `toc.md` files are human-readable. You can open them and make manual edits. For example, you can directly edit `toc.md` after it's created and before running `*plan-content`.

---

## 3. The Explanation (Why It Works This Way)

* **Why is it a "Pure Prompt Framework"?**
    By avoiding compiled code, FirePRD remains lightweight, transparent, and portable. Its logic is readable by humans and can be run in any compatible LLM environment without dependencies.

* **Why the mandatory approval for persona-switching?**
    This is a core principle of the BMAD (Bob-Made Agent Design) method. It ensures the user is always in control and aware of the agent's internal state. It makes the agent's behavior predictable and builds user trust.

* **Why is the state file (`workflow-state.toml`) so important?**
    It turns the agent from a simple conversationalist into a robust application. It provides memory, enables the workflow to be resumable across sessions, and is the key to advanced features like concurrent generation.

---

## 4. The Reference (Technical Details)

* **Command List:**
    * `*start <path>`: Initializes a workflow.
    * `*analyze`: Runs the code analysis.
    * `*design-toc`: Starts the interactive TOC design.
    * `*plan-content`: Generates chapter summaries.
    * `*finalize-plan`: Finalizes the generation plan.
    * `*generate-all-chapters`: Generates all files sequentially.
    * `*generate-chapter <id>`: Generates a single chapter.
    * `*status`: Shows the current workflow status.
    * `*reset`: Resets the workflow.

* **Directory Structure:**
    * `fireprd/agents/`: Contains the persona definitions for the orchestrator and specialists.
    * `fireprd/tasks/`: Contains the step-by-step procedural logic for each command.
    * `fireprd/cache/`: Contains the state file and intermediate artifacts. (Should be added to `.gitignore`).
