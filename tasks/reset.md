# tasks/reset.md

## Purpose
Reset the FirePRD workflow so you can start fresh. Supports a soft reset (clear runtime cache) and an optional hard reset (also delete generated outputs).

## Process
1. **Input:** Optional flag: `--hard` for a hard reset.
2. **Confirm:**
   - For soft reset: confirm "This will delete files under `fireprd/cache/`. Proceed? (yes/no)".
   - For hard reset: confirm "This will delete files under `fireprd/cache/` and all generated PRD outputs (e.g., `SUMMARY.md`, `Glossary.md`, and chapter files). Proceed? (yes/no)".
   - Abort unless user types `yes`.
3. **Soft Reset Steps:**
   - Delete everything under `fireprd/cache/` except the `.gitkeep` file.
4. **Hard Reset Additional Steps:**
   - Remove generated PRD outputs referenced by `plan.generationQueue.outputFile` and known top-level generated files (e.g., `SUMMARY.md`, `Glossary.md`) if they exist.
5. **Confirmation:**
   - Print: "Reset complete. You can run `*start <source_path>` to begin again."

## Notes
- Use soft reset for typical retries. Use hard reset when you want to delete all generated artifacts.
