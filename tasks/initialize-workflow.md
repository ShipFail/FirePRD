# tasks/initialize-workflow.md

## Purpose
To create and initialize the `workflow-state.toml` file, which acts as the single source of truth for the entire generation process, based on a user-provided source path.

## Process
1.  **Input:** This task requires one argument: `<source_path>`.
2.  **Directory Creation:** Ensure the `fireprd/cache/` directory exists. Create it if it does not.
3.  **File Creation:** Create a new file at `fireprd/cache/workflow-state.toml`, overwriting it if it already exists.
4.  **Content Generation:** Write the following TOML content to the file, substituting `{{sourcePath}}` with the `<source_path>` argument provided by the user.

    ```toml
    version = "1.0"
    status = "PLAN_CREATED"
    sourcePath = "{{sourcePath}}"
    nextStep = "analyze"

    [artifacts]
    codeAnalysis = ""
    toc = ""
    contentPlan = ""

    [plan]
    toc = []
    generationQueue = []

    [settings]
    # Max files per feature before a chapter is marked for splitting in finalize-plan
    splitThreshold = 5
    ```
5.  **Confirmation:** After successfully writing the file, the task is complete.

## Notes
- This task generates a runtime file at `fireprd/cache/workflow-state.toml`. Do not commit runtime state.
- For the full schema/example, see `fireprd/templates/workflow-state.example.toml`.
- Empty strings (`""`) are used to represent unset/null values since TOML has no native null type.
