## Purpose
To collaborate with the user to create and approve a Table of Contents (TOC) for the PRD, based on the `code-analysis.md` artifact.

## Process

1.  **Read Artifacts:**
    * Read the `fireprd/cache/workflow-state.yaml` file to find the path to the `code-analysis.md` artifact.
    * Read the `code-analysis.md` file and parse its "Inferred Features" and "Inferred User Journeys" sections.

2.  **Generate Initial Proposal:**
    * Synthesize a logical Table of Contents from the parsed features and journeys.
    * Structure the TOC as a nested markdown bulleted list of "Parts" and "Chapters".

3.  **Enter Interactive Loop:**
    * **A. Present:** Display the current version of the TOC to the user.
    * **B. Prompt for Feedback:** Ask the user for feedback with an open-ended question: "Please review this structure. What additions, removals, or changes should we make?"
    * **C. Wait for Input:** Await the user's response.
    * **D. Check for Exit Condition:** Analyze the user's response. If it contains explicit approval (e.g., "approve", "looks good", "proceed", "continue"), exit this loop and proceed to Step 4.
    * **E. Apply Feedback:** If the response contains feedback (e.g., "add a chapter for payments," "rename Part II," "combine chapters 3 and 4"), modify the TOC accordingly.
    * **F. Repeat Loop:** Go back to step 3.A to present the updated TOC.

4.  **Save Output Artifact:**
    * Once the loop is exited, save the final, approved TOC as a new file at `fireprd/cache/toc.md`.

5.  **Update State:**
    * Update the `fireprd/cache/workflow-state.yaml` file with the following changes:
        * Set `status` to `TOC_APPROVED`.
        * Set `artifacts.toc` to the path of the newly created `toc.md` file.
        * Set `nextStep` to `plan-content`.
