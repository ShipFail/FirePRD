# 🔥 FirePRD

**Transform your code into clear, product-focused documentation**

FirePRD is a prompt-based framework that generates human-centric Product Requirement Documents (PRDs) from source code. It uses a stateful, user-directed workflow managed by a central agent, making the process fully resumable.

## 🌟 Key Features

- **Stateful Workflow**: Resume your PRD generation at any time - the workflow state is automatically saved
- **Multi-Persona Architecture**: Leverages specialized personas for different tasks:
  - **Code Analyst**: Automated analysis of your source code
  - **PRD Writer**: Collaborative document structuring and content generation
- **User-Directed**: You maintain control over the structure and content of your PRD
- **Resumable Process**: Stop and resume at any step in the workflow
- **Automated Analysis**: Intelligent code analysis extracts key information automatically

## 🚀 How It Works

FirePRD follows a systematic, four-step workflow:

1. **Analysis Phase** (Automated)
   - The Code Analyst persona examines your source code
   - Identifies project structure, dependencies, features, and tech stack
   - Generates a comprehensive code analysis

2. **Structure Phase** (Collaborative)
   - The PRD Writer persona proposes a document structure
   - Based on the code analysis and best practices
   - Customizable to your needs

3. **Content Phase** (Collaborative)
   - Generates initial content for each section
   - Allows refinement and customization
   - Ensures human-centric, clear documentation

4. **Generation Phase** (Automated)
   - Compiles the final PRD document
   - Outputs a well-formatted markdown file
   - Ready to share with your team

## 📦 Installation

```bash
npm install -g fireprd
```

Or use it locally in your project:

```bash
npm install fireprd
```

## 💻 Usage

### CLI Usage

Generate a PRD for your current project:

```bash
fireprd
```

Generate a PRD for a specific project:

```bash
fireprd --path /path/to/your/project
```

View help:

```bash
fireprd --help
```

### Programmatic Usage

```javascript
const { FirePRDAgent } = require('fireprd');

async function generatePRD() {
  const agent = new FirePRDAgent('./my-project');
  const result = await agent.start();
  
  if (result.success) {
    console.log('PRD generated successfully!');
    console.log(result.prd.document);
  }
}

generatePRD();
```

## 🔄 Resumable Workflow

FirePRD automatically saves your progress in a `.fireprd-state.json` file. If you need to stop the process:

1. Simply interrupt the process (Ctrl+C)
2. Your progress is automatically saved
3. Run `fireprd` again to resume from where you left off

To start fresh, delete the `.fireprd-state.json` file.

## 🏗️ Architecture

FirePRD uses a clean, modular architecture:

```
src/
├── agents/          # Central FirePRD agent
├── personas/        # Code Analyst and PRD Writer personas
├── workflow/        # Workflow management and orchestration
├── state/           # State persistence for resumability
└── prompts/         # Prompt generation for LLM interactions
```

### Core Components

- **FirePRDAgent**: Central orchestrator managing the entire workflow
- **CodeAnalystPersona**: Automated code analysis and feature extraction
- **PRDWriterPersona**: Document structure and content generation
- **WorkflowManager**: Stateful workflow step management
- **StateManager**: Persistent state for resumable workflows

## 📄 Output

FirePRD generates a comprehensive PRD in markdown format with sections including:

- Executive Summary
- Product Overview
- Technical Architecture
- Key Features
- User Experience
- Dependencies & Integrations
- Future Considerations

The generated PRD is saved as `PRD.md` in your project directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/ShipFail/FirePRD)
- [Report Issues](https://github.com/ShipFail/FirePRD/issues)

---

Made with ❤️ by [Ship.Fail](https://github.com/ShipFail)
