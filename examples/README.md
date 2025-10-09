# FirePRD Examples

This directory contains examples demonstrating how to use FirePRD.

## Basic Usage

Run the basic usage example:

```bash
node examples/basic-usage.js
```

This example demonstrates:
- Creating a FirePRDAgent instance
- Running the workflow
- Accessing the generated PRD
- Checking workflow status

## CLI Usage

For simple use cases, use the CLI:

```bash
# Generate PRD for current directory
fireprd

# Generate PRD for a specific project
fireprd --path /path/to/project
```

## Resumable Workflow

FirePRD automatically saves progress. If interrupted:

1. Stop the process (Ctrl+C)
2. Run again - it will resume from the last completed step
3. The state is saved in `.fireprd-state.json`

To start fresh, delete the `.fireprd-state.json` file.

## Custom Integration

You can integrate FirePRD into your own tools:

```javascript
const { FirePRDAgent } = require('fireprd');

async function customIntegration() {
  const agent = new FirePRDAgent('./my-project');
  
  // Run the workflow
  const result = await agent.start();
  
  // Use the generated PRD
  if (result.success) {
    const prdDocument = result.prd.document;
    // Send to your documentation system
    // Email to stakeholders
    // Add to your wiki
    // etc.
  }
}
```

## Advanced Usage

### Access Individual Personas

```javascript
const { CodeAnalystPersona, PRDWriterPersona } = require('fireprd');

const analyst = new CodeAnalystPersona();
const analysis = await analyst.analyzeProject('./my-project');

const writer = new PRDWriterPersona();
const structure = writer.proposeStructure(analysis);
```

### Custom State Management

```javascript
const { StateManager } = require('fireprd');

const stateManager = new StateManager('custom-state.json');
const state = await stateManager.load();
// Work with state
await stateManager.save(modifiedState);
```
