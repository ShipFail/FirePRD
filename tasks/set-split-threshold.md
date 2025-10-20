# tasks/set-split-threshold.md

## Purpose
Update the `settings.splitThreshold` value in `fireprd/cache/workflow-state.toml` so users can tune chapter splitting behavior without restarting the workflow.

## Process
1. **Input:** Requires one numeric argument: `<n>` (integer, >= 1; <= 1000 recommended).
2. **Pre-checks:**
   - Ensure `fireprd/cache/workflow-state.toml` exists. If it does not, instruct the user to run `*start <source_path>` first.
3. **Validation:**
   - Parse `<n>` as an integer.
   - If `<n>` is not a number or `< 1`, halt and ask for a valid positive integer.
4. **Update:**
   - Read the TOML from `fireprd/cache/workflow-state.toml`.
   - Set `settings.splitThreshold` to `<n>` (create `[settings]` section if missing).
   - Do not modify other fields.
5. **Confirmation:**
   - Save the file.
   - Print: "Updated settings.splitThreshold to <n>. This will be applied in the next `*finalize-plan` or generation step."

## Notes
- This command is safe to run at any stage after `*start`. It will take effect the next time `*finalize-plan` evaluates chapter complexity.
- If you have already finalized and want to re-queue with the new threshold, re-run `*finalize-plan`.
