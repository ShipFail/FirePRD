/**
 * PRD Writer Persona
 * 
 * Responsible for collaborating with users to create the PRD structure,
 * refine content, and generate the final human-centric PRD document.
 */

const PromptGenerator = require('../prompts/PromptGenerator');

class PRDWriterPersona {
  constructor() {
    this.name = 'PRD Writer';
    this.promptGenerator = new PromptGenerator();
  }

  getName() {
    return this.name;
  }

  /**
   * Collaborate with user on PRD structure
   */
  async collaborateOnStructure(analysis) {
    console.log(`✏️  ${this.name}: Proposing PRD structure based on analysis...`);
    
    const proposedStructure = this.proposeStructure(analysis);
    
    console.log('\n📋 Proposed PRD Structure:');
    proposedStructure.sections.forEach((section, index) => {
      console.log(`   ${index + 1}. ${section.title}`);
    });
    
    console.log('\n💡 This structure is based on your project analysis.');
    console.log('   In an interactive session, you could customize this structure.\n');
    
    return proposedStructure;
  }

  /**
   * Propose initial PRD structure
   */
  proposeStructure(analysis) {
    const structure = {
      title: 'Product Requirements Document',
      sections: [
        {
          title: 'Executive Summary',
          description: 'High-level overview of the product',
          required: true
        },
        {
          title: 'Product Overview',
          description: 'What the product is and what it does',
          required: true
        },
        {
          title: 'Technical Architecture',
          description: `Technology stack: ${analysis.techStack.language}, ${analysis.techStack.framework}`,
          required: true
        },
        {
          title: 'Key Features',
          description: `Core functionality (${analysis.features.length} features identified)`,
          required: true
        },
        {
          title: 'User Experience',
          description: 'How users interact with the product',
          required: true
        },
        {
          title: 'Dependencies & Integrations',
          description: 'External dependencies and integration points',
          required: false
        },
        {
          title: 'Future Considerations',
          description: 'Potential enhancements and roadmap',
          required: false
        }
      ]
    };

    return structure;
  }

  /**
   * Collaborate with user on content refinement
   */
  async collaborateOnContent(analysis, structure) {
    console.log(`✏️  ${this.name}: Generating content for each section...`);
    
    const content = {
      metadata: {
        generatedAt: new Date().toISOString(),
        projectPath: analysis.projectPath
      },
      sections: []
    };

    for (const section of structure.sections) {
      console.log(`   📝 Drafting: ${section.title}`);
      const sectionContent = await this.generateSectionContent(section, analysis);
      content.sections.push(sectionContent);
    }

    console.log('\n💡 Content has been drafted based on code analysis.');
    console.log('   In an interactive session, you could refine each section.\n');

    return content;
  }

  /**
   * Generate content for a specific section
   */
  async generateSectionContent(section, analysis) {
    const sectionContent = {
      title: section.title,
      content: ''
    };

    switch (section.title) {
      case 'Executive Summary':
        sectionContent.content = this.generateExecutiveSummary(analysis);
        break;
      
      case 'Product Overview':
        sectionContent.content = this.generateProductOverview(analysis);
        break;
      
      case 'Technical Architecture':
        sectionContent.content = this.generateTechnicalArchitecture(analysis);
        break;
      
      case 'Key Features':
        sectionContent.content = this.generateKeyFeatures(analysis);
        break;
      
      case 'User Experience':
        sectionContent.content = this.generateUserExperience(analysis);
        break;
      
      case 'Dependencies & Integrations':
        sectionContent.content = this.generateDependencies(analysis);
        break;
      
      case 'Future Considerations':
        sectionContent.content = this.generateFutureConsiderations(analysis);
        break;
      
      default:
        sectionContent.content = `Content for ${section.title}`;
    }

    return sectionContent;
  }

  /**
   * Generate final PRD document
   */
  async generateFinalPRD(analysis, structure, content) {
    console.log(`📄 ${this.name}: Compiling final PRD document...`);
    
    const prd = {
      metadata: {
        title: structure.title,
        generatedAt: new Date().toISOString(),
        projectPath: analysis.projectPath,
        version: '1.0.0'
      },
      document: this.compilePRDDocument(structure, content)
    };

    console.log('\n✨ PRD document compiled successfully!');
    
    return prd;
  }

  /**
   * Compile PRD document into markdown format
   */
  compilePRDDocument(structure, content) {
    let document = `# ${structure.title}\n\n`;
    document += `*Generated by FirePRD - ${new Date().toLocaleDateString()}*\n\n`;
    document += '---\n\n';

    for (const section of content.sections) {
      document += `## ${section.title}\n\n`;
      document += `${section.content}\n\n`;
      document += '---\n\n';
    }

    return document;
  }

  /**
   * Content generation helpers
   */
  generateExecutiveSummary(analysis) {
    return `This document outlines the product requirements for a ${analysis.techStack.language}-based application ` +
           `built with ${analysis.techStack.framework}. ${analysis.summary}`;
  }

  generateProductOverview(analysis) {
    return `The application is a ${analysis.techStack.framework} project that provides functionality ` +
           `across ${analysis.structure.directories.length} main modules. The project structure includes ` +
           `${analysis.structure.entryPoints.length} entry point(s) and utilizes ${analysis.dependencies.production.length} ` +
           `production dependencies.`;
  }

  generateTechnicalArchitecture(analysis) {
    let content = `**Language:** ${analysis.techStack.language}\n`;
    content += `**Framework:** ${analysis.techStack.framework}\n`;
    
    if (analysis.techStack.tools.length > 0) {
      content += `**Tools:** ${analysis.techStack.tools.join(', ')}\n`;
    }
    
    content += `\n**Project Structure:**\n`;
    content += `- ${analysis.structure.files.length} source files\n`;
    content += `- ${analysis.structure.directories.length} directories\n`;
    
    if (analysis.structure.entryPoints.length > 0) {
      content += `- Entry points: ${analysis.structure.entryPoints.join(', ')}\n`;
    }

    return content;
  }

  generateKeyFeatures(analysis) {
    let content = 'The application includes the following key features:\n\n';
    analysis.features.forEach((feature, index) => {
      content += `${index + 1}. **${feature}**: Provides essential functionality for the application\n`;
    });
    return content;
  }

  generateUserExperience(analysis) {
    return `The application is built with a focus on developer experience and maintainability. ` +
           `The modular structure with ${analysis.structure.directories.length} directories promotes ` +
           `code organization and scalability.`;
  }

  generateDependencies(analysis) {
    let content = '';
    
    if (analysis.dependencies.production.length > 0) {
      content += '**Production Dependencies:**\n';
      analysis.dependencies.production.forEach(dep => {
        content += `- ${dep}\n`;
      });
      content += '\n';
    }
    
    if (analysis.dependencies.development.length > 0) {
      content += '**Development Dependencies:**\n';
      analysis.dependencies.development.forEach(dep => {
        content += `- ${dep}\n`;
      });
    }
    
    if (content === '') {
      content = 'No external dependencies identified in the project.';
    }
    
    return content;
  }

  generateFutureConsiderations(analysis) {
    return 'Future enhancements may include:\n\n' +
           '- Enhanced documentation\n' +
           '- Additional testing coverage\n' +
           '- Performance optimizations\n' +
           '- Integration with additional third-party services';
  }
}

module.exports = PRDWriterPersona;
