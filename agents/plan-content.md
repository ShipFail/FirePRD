# tasks/plan-content.md

## Purpose
To generate a concise, 1-2 sentence summary for each chapter defined in `toc.md` by using the detailed context from the `code-analysis.md` artifact.

## Process

1.  **Read Artifacts:**
    * Read the `fireprd/cache/workflow-state.yaml` file to find the file paths for `toc.md` and `code-analysis.md`.
    * Load and parse both of these artifact files.

2.  **Initialize Output:**
    * Create a data structure to hold the `content-plan.md` content, starting with the structure from `toc.md`.

3.  **Process Loop:**
    * For each chapter listed in the `toc.md` structure:
        * **A. Correlate:** Find the corresponding feature or user journey in `code-analysis.md` by matching the chapter title to a `name` field in the analysis.
        * **B. Generate Summary:** If a match is found, send a prompt to the LLM with the following instruction:
          `"You are a product writer. Based on the following technical description, write a single, non-technical sentence that summarizes the purpose of this product chapter. DESCRIPTION: [Insert the 'description' text from the matched feature/journey here]"`
        * **C. Append Summary:** Append the LLM-generated summary to the corresponding chapter in your output data structure.

4.  **Save Output Artifact:**
    * After iterating through all chapters, format the final data structure as a markdown list.
    * Save the content to a new file at `fireprd/cache/content-plan.md`.

5.  **Update State:**
    * Update the `fireprd/cache/workflow-state.yaml` file with the following changes:
        * Set `status` to `CONTENT_PLAN_COMPLETE`.
        * Set `artifacts.contentPlan` to the path of the newly created `content-plan.md` file.
        * Set `nextStep` to `finalize-plan`.
