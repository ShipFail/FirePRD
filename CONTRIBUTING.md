# Contributing to FirePRD

Thank you for your interest in contributing to FirePRD! This document provides guidelines and instructions for contributing.

## Getting Started

### Prerequisites

- Node.js 14.0.0 or higher
- Git
- A GitHub account

### Setup Development Environment

1. Fork the repository on GitHub
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/FirePRD.git
   cd FirePRD
   ```

3. Install dependencies (currently none, but this may change):
   ```bash
   npm install
   ```

4. Test the installation:
   ```bash
   npm start -- --help
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature or fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes following the code style guidelines

3. Test your changes:
   ```bash
   node src/cli.js --path .
   ```

4. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Add: Brief description of your changes"
   ```

### Testing Your Changes

Before submitting a PR, test your changes:

1. **Run on a sample project**:
   ```bash
   npm start -- --path /path/to/sample/project
   ```

2. **Test resumability**:
   - Start the workflow
   - Interrupt it (Ctrl+C)
   - Resume it
   - Verify it continues from the saved state

3. **Test edge cases**:
   - Empty project
   - Project without package.json
   - Large project

4. **Verify output**:
   - Check the generated PRD.md
   - Verify all sections are present
   - Ensure formatting is correct

## Code Style Guidelines

### JavaScript Style

- Use consistent indentation (2 spaces)
- Use meaningful variable and function names
- Add JSDoc comments for classes and public methods
- Use async/await for asynchronous operations
- Handle errors appropriately

### Example:

```javascript
/**
 * Description of what this function does
 * 
 * @param {string} param1 - Description of param1
 * @param {Object} param2 - Description of param2
 * @returns {Promise<Object>} Description of return value
 */
async function myFunction(param1, param2) {
  try {
    // Implementation
    return result;
  } catch (error) {
    console.error(`Error in myFunction: ${error.message}`);
    throw error;
  }
}
```

### File Organization

- Keep related functionality in the same file
- Create new files/modules when a component grows large
- Follow the existing directory structure:
  - `src/agents/` - Agent implementations
  - `src/personas/` - Persona implementations
  - `src/workflow/` - Workflow management
  - `src/state/` - State persistence
  - `src/prompts/` - Prompt generation

## What to Contribute

### Ideas for Contributions

1. **New Features**:
   - Interactive mode for structure/content refinement
   - LLM integration for enhanced analysis
   - Additional output formats (HTML, PDF)
   - Custom templates
   - Multi-language support

2. **Improvements**:
   - Better code analysis algorithms
   - Enhanced feature detection
   - Improved PRD structure
   - Performance optimizations

3. **Documentation**:
   - More examples
   - Tutorial videos
   - API documentation
   - Use case guides

4. **Testing**:
   - Unit tests
   - Integration tests
   - Test fixtures
   - CI/CD setup

5. **Bug Fixes**:
   - Check the Issues page for bugs
   - Fix edge cases
   - Improve error handling

## Adding New Personas

To add a new persona:

1. Create a new file in `src/personas/`:
   ```javascript
   class MyNewPersona {
     constructor() {
       this.name = 'My New Persona';
     }

     getName() {
       return this.name;
     }

     // Add your persona methods here
   }

   module.exports = MyNewPersona;
   ```

2. Import it in `FirePRDAgent.js`:
   ```javascript
   const MyNewPersona = require('../personas/MyNewPersona');
   ```

3. Use it in the workflow:
   ```javascript
   this.myPersona = new MyNewPersona();
   ```

4. Export it from `index.js` if it should be public API

## Adding Workflow Steps

To add a new workflow step:

1. Add the step name to `WorkflowManager.js`:
   ```javascript
   this.steps = ['analysis', 'structure', 'content', 'mystep', 'generation', 'complete'];
   ```

2. Add a handler in `FirePRDAgent.js`:
   ```javascript
   async executeWorkflow() {
     const currentStep = this.workflowManager.getCurrentStep();
     
     switch (currentStep) {
       // ... existing cases
       case 'mystep':
         return await this.performMyStep();
       // ... other cases
     }
   }

   async performMyStep() {
     console.log('🔄 My Custom Step...');
     // Implementation
     this.workflowManager.moveToNextStep();
     await this.saveState();
     return this.executeWorkflow();
   }
   ```

## Submitting Changes

### Pull Request Process

1. Push your changes to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Open a Pull Request on GitHub

3. Fill in the PR template with:
   - Description of changes
   - Why the changes are needed
   - How to test the changes
   - Screenshots (if applicable)

4. Wait for review and address any feedback

### PR Guidelines

- Keep PRs focused on a single feature or fix
- Include tests if adding new functionality
- Update documentation if needed
- Ensure the PR description is clear
- Link any related issues

## Code Review Process

All submissions require review. We will:

1. Review your code for quality and style
2. Test the functionality
3. Provide feedback or approve
4. Merge approved PRs

## Community

- Be respectful and constructive
- Help others in discussions
- Share your use cases and experiences
- Report bugs with detailed information

## Questions?

If you have questions:
- Open an issue for bugs
- Start a discussion for feature ideas
- Check existing issues and PRs first

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to FirePRD! 🔥
