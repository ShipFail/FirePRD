# tasks/finalize-plan.md

## Purpose
To present the complete, summarized PRD plan to the user for final approval, apply the 3-layer hierarchy rule, and prepare the `generationQueue` for the final content writing phase.

## Process

1.  **Read Artifacts:**
    * Read the `fireprd/cache/workflow-state.toml` to get the paths for `content-plan.md` and `code-analysis.md`.
    * Load and parse both of these artifact files.
    * Read `settings.splitThreshold` from the state; default to `5` if not set.

2.  **Apply Hierarchy Rule:**
    * Iterate through each chapter in the `content-plan.md`.
    * For each chapter, find its corresponding feature in `code-analysis.md`.
    * Count the number of `source_files` listed for that feature.
    * **If the count exceeds `splitThreshold`**, mark this chapter for splitting and add a note to its presentation string.

3.  **Present Final Plan for Approval:**
    * Display the full Table of Contents, including the summaries from `content-plan.md`.
    * For any chapters marked for splitting, append a note, e.g., `(Note: This chapter is complex and will be split into multiple sections)`.
    * Ask the user for final, explicit approval with a clear prompt: "This is the final plan for the document structure. Once you approve, the agent will be ready to generate all files. Please review and type 'approve' to proceed."
    * **HALT** and wait for user's approval. Do not proceed without it.

4.  **Populate Generation Queue:**
    * Once approved, construct the `plan.generationQueue` list.
    * For each chapter *not* marked for splitting, create a single entry in the queue.
    * For each chapter *marked for splitting*, create multiple entries, one for each logical subsection. (The agent should infer these subsections from the feature description in `code-analysis.md`).
    * Each entry in the queue must have a unique `id`, a `status = "pending"`, and the correct final `outputFile` path.

5.  **Update State:**
    * Update the `fireprd/cache/workflow-state.toml` file with the following changes:
        * Set `status` to `"PLAN_FINALIZED"`.
        * Set the `plan.generationQueue` to the list created in the previous step.
        * Set `nextStep` to `"generate-all-chapters"`.
