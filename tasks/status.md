# tasks/status.md

## Purpose
Display a concise, human-readable summary of the current FirePRD workflow state so the user can see progress and what to do next.

## Process
1. **Read State:**
   - Load `fireprd/cache/workflow-state.yaml`.
   - If the file does not exist, print: "No active workflow. Run `*start <source_path>` to begin."
2. **Print Summary:**
   - version
   - status
   - nextStep
   - sourcePath
   - artifacts (show each key with value or `-` if null)
   - plan summary (counts only):
     - toc items count
     - generationQueue: total, and counts by status if present (pending, running, done)
3. **Guidance:**
   - If `nextStep` is set, suggest: "Next command: `*<nextStep>`".
   - Otherwise, if `status` is `GENERATION_COMPLETE`, suggest: "You're done. You can run `*reset` to start over."

## Notes
- This task is read-only and should not modify the state file.
