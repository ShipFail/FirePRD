# tasks/analyze-codebase.md

## Purpose
To analyze a source code directory and generate a structured `code-analysis.md` file that summarizes its features, journeys, and data models from a technical perspective.

## Process

1.  **Read State:** Read the `sourcePath` from the `fireprd/cache/workflow-state.yaml` file. If the path is invalid or not found, report an error and halt.

2.  **Traverse Filesystem:** Traverse the file system at the `sourcePath`. Read the content of all relevant source files (e.g., `.ts`, `.tsx`, `.js`, `.py`, etc.). You must ignore common dependency/build directories (`node_modules`, `.git`, `dist`, `build`) and respect any `.gitignore` file present in the `sourcePath`.

3.  **Construct Analysis Prompt:** Combine the relative path and content of all read files into a single, large context block for the LLM. Prepend this block with the following master instruction prompt:

    ---
    **MASTER INSTRUCTION:**
    You are a code analysis engine. Based on the following codebase, you will identify the primary features, inferred user journeys, and data models. Your output must be a single markdown document that strictly adheres to the FirePRD Code Analysis v1.0 schema. Do not add any conversational text or explanations. Your entire response should be only the markdown content.

    **Schema Example:**
    ```markdown
    # FirePRD Code Analysis v1.0

    ## Project Overview
    - **Languages:** ...
    - **Frameworks:** ...
    - **Key Libraries:** ...

    ## Inferred Features
    - **feature_id:** `a-unique-kebab-case-id`
      - **name:** A Human-Readable Name
      - **description:** A brief explanation of the feature.
      - **source_files:**
        - `/path/to/relevant/file1.ts`
        - `/path/to/relevant/file2.tsx`

    ## Inferred User Journeys
    - **journey_id:** `a-unique-kebab-case-id`
      - **name:** A Human-Readable Name for the Journey
      - **steps:**
        1. Step 1 description.
        2. Step 2 description.
    
    ## Inferred Glossary
    - **Term:** The definition of a key term found in the code.
    ```
    ---

4.  **Execute and Save:** Send the combined master instruction and codebase content to the LLM. Save the raw markdown response to `fireprd/cache/code-analysis.md`.

5.  **Validate Artifact:** Perform a sanity check on the created file. Verify it is valid markdown and contains at least the `## Inferred Features` heading. If the check fails, this task has failed.

6.  **Update State:** Upon successful creation and validation of the artifact, update the `fireprd/cache/workflow-state.yaml` file. Set `status` to `ANALYSIS_COMPLETE`, set `artifacts.codeAnalysis` to the file's path, and set `nextStep` to `design-toc`.
