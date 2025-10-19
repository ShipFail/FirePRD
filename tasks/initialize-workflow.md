# tasks/initialize-workflow.md

## Purpose
To create and initialize the `workflow-state.yaml` file, which acts as the single source of truth for the entire generation process, based on a user-provided source path.

## Process
1.  **Input:** This task requires one argument: `<source_path>`.
2.  **Directory Creation:** Ensure the `fireprd/cache/` directory exists. Create it if it does not.
3.  **File Creation:** Create a new file at `fireprd/cache/workflow-state.yaml`, overwriting it if it already exists.
4.  **Content Generation:** Write the following YAML content to the file, substituting `{{sourcePath}}` with the `<source_path>` argument provided by the user.

    ```yaml
    version: 1.0
    status: PLAN_CREATED
    sourcePath: {{sourcePath}}
    nextStep: analyze
    artifacts:
      codeAnalysis: null
      toc: null
      contentPlan: null
    plan:
      toc: []
      generationQueue: []
    ```
5.  **Confirmation:** After successfully writing the file, the task is complete.
