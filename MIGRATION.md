# YAML to TOML Migration Summary

## Date
October 20, 2025

## Motivation
YAML's whitespace-sensitive syntax proved fragile for AI agent editing. Multiple indentation errors occurred during automated updates, risking data corruption and workflow failures. TOML's explicit structure eliminates indentation ambiguity and provides better error messages.

## Changes Made

### 1. Agent Front Matter (3 files)
- **Changed:** All agent definition files now use TOML front matter with `+++` delimiters
- **Files:**
  - `agents/fireprd.md`: Converted nested YAML to TOML tables and arrays
  - `agents/code-analyst.md`: Converted to TOML
  - `agents/prd-writer.md`: Converted to TOML
- **Key syntax changes:**
  - `commands:` array → `[[commands]]` array-of-tables
  - `core_principles:` nested list → flat array of strings
  - Reference changed from `workflow-state.yaml` → `workflow-state.toml`

### 2. Runtime State File
- **Changed:** `fireprd/cache/workflow-state.{yaml→toml}`
- **Null handling:** YAML `null` → TOML empty string `""`
  - Tasks now check: `if value == ""` to detect unset artifacts
- **String values:** All enum-like values now quoted (e.g., `status = "PLAN_CREATED"`)
- **Arrays:** Empty arrays remain `[]`

### 3. Template/Schema
- **Deleted:** `templates/workflow-state.example.yaml`
- **Created:** `templates/workflow-state.example.toml`
- **Enhancements:**
  - Added note about TOML's lack of native null
  - Documented empty string `""` convention
  - Included complete commented example state
  - Added type hints for Part and GenerationJob structures

### 4. Task Files (8 files updated)
All references to `.yaml` changed to `.toml`:
- `tasks/initialize-workflow.md`: Updated template and added empty string note
- `tasks/analyze-codebase.md`: Updated state references and quoted status values
- `tasks/design-toc.md`: Updated state references and quoted status values
- `tasks/plan-content.md`: Updated state references and quoted status values
- `tasks/finalize-plan.md`: Updated state references and quoted status values
- `tasks/generate-content.md`: Updated state references, quoted values, empty string for nextStep
- `tasks/set-split-threshold.md`: Updated state references and section syntax
- `tasks/status.md`: Updated state references and empty string note

### 5. Documentation (4 files updated)
- `README.md`: All references to `.yaml` → `.toml`
- `TUTORIAL.md`: All references to `.yaml` → `.toml`
- `ARCHITECTURE.md`: Format changed from "YAML" to "TOML", path references updated
- `DESIGN.md`: Updated design rationale to reflect TOML choice for robustness

## Breaking Changes
This is a **breaking change** for any existing FirePRD workflows:
- Users with existing `fireprd/cache/workflow-state.yaml` files must delete them and run `*start` again
- IDE configurations expecting YAML front matter in agent files may need updates
- Any custom scripts parsing the state file must be updated

## Migration Guide for Users
1. Delete `fireprd/cache/` directory contents
2. Pull the latest FirePRD code with TOML support
3. Re-run `*start <source_path>` to initialize a new TOML state file
4. Continue workflow as normal—commands are unchanged

## Benefits Gained
1. **AI editing safety:** No more indentation-based corruption
2. **Clear error messages:** TOML parsers report exact line/column of syntax errors
3. **Explicit structure:** Section headers make file organization obvious
4. **Partial updates:** Easier to modify single sections without affecting adjacent data
5. **Future-proof:** Better tooling support for validation and schema enforcement

## Known Limitations
1. **No native null:** Using empty string `""` as a sentinel; requires runtime checks
2. **Verbosity:** TOML front matter for commands is more verbose than YAML
3. **Convention change:** TOML front matter is less common than YAML in Markdown files

## Testing Recommendations
- Verify IDE/LLM can parse TOML front matter with `+++` delimiters
- Test all workflow commands end-to-end: start → analyze → design-toc → plan-content → finalize-plan → generate-all-chapters
- Validate state file updates after each command
- Test `*status` and `*reset` commands
- Verify `*set split-threshold` correctly updates TOML sections

## Rollback Plan (if needed)
The Git history contains the full YAML implementation. To rollback:
```bash
git checkout main  # or the pre-TOML commit SHA
```

This will restore all YAML front matter, task references, and templates.
