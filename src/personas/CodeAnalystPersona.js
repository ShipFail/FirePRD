/**
 * Code Analyst Persona
 * 
 * Responsible for automated analysis of source code to extract
 * key information needed for PRD generation.
 */

const fs = require('fs').promises;
const path = require('path');

class CodeAnalystPersona {
  constructor() {
    this.name = 'Code Analyst';
  }

  getName() {
    return this.name;
  }

  /**
   * Analyze a project to extract key information
   */
  async analyzeProject(projectPath) {
    console.log(`🔍 ${this.name}: Analyzing project at ${projectPath}...`);
    
    const analysis = {
      timestamp: new Date().toISOString(),
      projectPath: projectPath,
      structure: await this.analyzeStructure(projectPath),
      dependencies: await this.analyzeDependencies(projectPath),
      features: await this.identifyFeatures(projectPath),
      techStack: await this.identifyTechStack(projectPath),
      summary: ''
    };

    analysis.summary = this.generateSummary(analysis);
    
    return analysis;
  }

  /**
   * Analyze project structure
   */
  async analyzeStructure(projectPath) {
    const structure = {
      files: [],
      directories: [],
      entryPoints: [],
      configFiles: []
    };

    try {
      const items = await fs.readdir(projectPath, { withFileTypes: true });
      
      for (const item of items) {
        if (item.name.startsWith('.') || item.name === 'node_modules') {
          continue;
        }

        if (item.isDirectory()) {
          structure.directories.push(item.name);
        } else {
          structure.files.push(item.name);
          
          if (this.isConfigFile(item.name)) {
            structure.configFiles.push(item.name);
          }
          
          if (this.isEntryPoint(item.name)) {
            structure.entryPoints.push(item.name);
          }
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not analyze structure: ${error.message}`);
    }

    return structure;
  }

  /**
   * Analyze project dependencies
   */
  async analyzeDependencies(projectPath) {
    const dependencies = {
      production: [],
      development: [],
      other: []
    };

    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
      
      if (packageJson.dependencies) {
        dependencies.production = Object.keys(packageJson.dependencies);
      }
      
      if (packageJson.devDependencies) {
        dependencies.development = Object.keys(packageJson.devDependencies);
      }
    } catch (error) {
      console.log('   (No package.json found or unable to parse)');
    }

    return dependencies;
  }

  /**
   * Identify features from code analysis
   */
  async identifyFeatures(projectPath) {
    const features = [];
    
    features.push('Project structure analysis');
    
    const structure = await this.analyzeStructure(projectPath);
    
    if (structure.files.some(f => f.includes('test') || f.includes('spec'))) {
      features.push('Automated testing');
    }
    
    if (structure.configFiles.includes('package.json')) {
      features.push('NPM package management');
    }
    
    if (structure.directories.includes('src') || structure.directories.includes('lib')) {
      features.push('Modular source organization');
    }

    return features;
  }

  /**
   * Identify technology stack
   */
  async identifyTechStack(projectPath) {
    const techStack = {
      language: 'JavaScript',
      framework: 'Node.js',
      tools: []
    };

    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      const packageJson = JSON.parse(await fs.readFile(packageJsonPath, 'utf8'));
      
      const allDeps = {
        ...packageJson.dependencies || {},
        ...packageJson.devDependencies || {}
      };

      if (allDeps.react) techStack.framework = 'React';
      if (allDeps.vue) techStack.framework = 'Vue';
      if (allDeps.angular) techStack.framework = 'Angular';
      if (allDeps.express) techStack.tools.push('Express');
      if (allDeps.typescript) techStack.language = 'TypeScript';
      if (allDeps.jest || allDeps.mocha) techStack.tools.push('Testing Framework');
      if (allDeps.webpack || allDeps.vite) techStack.tools.push('Build Tool');
    } catch (error) {
      // Use defaults
    }

    return techStack;
  }

  /**
   * Generate analysis summary
   */
  generateSummary(analysis) {
    return `Project contains ${analysis.structure.files.length} files across ${analysis.structure.directories.length} directories. ` +
           `Technology stack: ${analysis.techStack.language} with ${analysis.techStack.framework}. ` +
           `Identified ${analysis.features.length} key features.`;
  }

  /**
   * Helper: Check if file is a config file
   */
  isConfigFile(filename) {
    const configPatterns = [
      'package.json', 'tsconfig.json', 'webpack.config.js', 
      'vite.config.js', '.eslintrc', '.prettierrc', 'jest.config.js'
    ];
    return configPatterns.some(pattern => filename.includes(pattern));
  }

  /**
   * Helper: Check if file is an entry point
   */
  isEntryPoint(filename) {
    const entryPatterns = ['index.js', 'main.js', 'app.js', 'server.js', 'index.ts', 'main.ts'];
    return entryPatterns.includes(filename);
  }
}

module.exports = CodeAnalystPersona;
