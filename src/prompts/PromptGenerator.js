/**
 * Prompt Generator
 * 
 * Generates prompts for LLM interactions in the PRD generation process.
 * This is a placeholder for future LLM integration.
 */

class PromptGenerator {
  constructor() {
    this.templates = {
      analysis: 'Analyze the following code structure...',
      structure: 'Generate a PRD structure for...',
      content: 'Write content for the following PRD section...',
      refinement: 'Refine the following content...'
    };
  }

  /**
   * Generate a prompt for code analysis
   */
  generateAnalysisPrompt(codeContext) {
    return {
      template: this.templates.analysis,
      context: codeContext
    };
  }

  /**
   * Generate a prompt for structure definition
   */
  generateStructurePrompt(analysis) {
    return {
      template: this.templates.structure,
      context: analysis
    };
  }

  /**
   * Generate a prompt for content generation
   */
  generateContentPrompt(section, analysis) {
    return {
      template: this.templates.content,
      context: { section, analysis }
    };
  }

  /**
   * Generate a prompt for content refinement
   */
  generateRefinementPrompt(content, feedback) {
    return {
      template: this.templates.refinement,
      context: { content, feedback }
    };
  }
}

module.exports = PromptGenerator;
