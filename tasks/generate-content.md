# tasks/generate-content.md

## Purpose
To read the finalized plan from the `workflow-state.yaml`, iterate through the `generationQueue`, and generate the complete `fireprd/` directory structure and content for each file.

## Process

1.  **Load State:**
    * Read the `fireprd/cache/workflow-state.yaml` file.
    * Load the `generationQueue` and the paths to the `code-analysis.md` and `content-plan.md` artifacts.

2.  **Iterate Through Generation Queue:**
    * For each job in the `generationQueue` where `status` is `pending`:
        * **A. Provide Feedback:** Announce to the operator which file is being generated.
        * **B. Gather Context:** Collect the chapter title, the chapter summary (from `content-plan.md`), and the corresponding detailed feature/journey description from `code-analysis.md`.
        * **C. Construct Content Prompt:** Send a prompt to the LLM with the following master instruction:
          `"You are a senior product designer writing a chapter for a Product Requirements Document. Using the provided chapter summary and technical analysis, write the content for the chapter. The content must include sections for '## Purpose', '## Target User Problem', '## Desired Experience', and '## User-Facing Acceptance Criteria'. The language must be non-technical, human-centered, and focused on the product story. SUMMARY: [Insert summary here]. TECHNICAL ANALYSIS: [Insert relevant description from code-analysis.md here]."`
        * **D. Create File:** Create the necessary directories and write the LLM's response to the `outputFile` path specified in the job.
        * **E. Update State (Atomic):** Immediately after writing the file, update the `status` of the current job in `workflow-state.yaml` to `complete`.

3.  **Generate Ancillary Files (Post-Loop):**
    * After the main loop is complete:
        * **A. Create `SUMMARY.md`:** Generate a markdown-formatted Table of Contents with relative links to all the `outputFile` paths listed in the `generationQueue`.
        * **B. Create `Glossary.md`:** Copy the content from the `## Inferred Glossary` section of the `code-analysis.md` artifact into this file.

4.  **Finalize State:**
    * Update the `fireprd/cache/workflow-state.yaml` file one last time:
        * Set `status` to `GENERATION_COMPLETE`.
        * Set `nextStep` to `null`.
