/**
 * FirePRD Central Agent
 * 
 * Manages the stateful, user-directed workflow for generating PRDs from source code.
 * This agent is resumable and coordinates between different personas.
 */

const CodeAnalystPersona = require('../personas/CodeAnalystPersona');
const PRDWriterPersona = require('../personas/PRDWriterPersona');
const WorkflowManager = require('../workflow/WorkflowManager');
const StateManager = require('../state/StateManager');

class FirePRDAgent {
  constructor(projectPath, stateFile = '.fireprd-state.json') {
    this.projectPath = projectPath;
    this.stateManager = new StateManager(stateFile);
    this.workflowManager = new WorkflowManager();
    this.codeAnalyst = new CodeAnalystPersona();
    this.prdWriter = new PRDWriterPersona();
    this.currentPersona = null;
  }

  /**
   * Initialize or resume a workflow
   */
  async start() {
    const state = await this.stateManager.load();
    
    if (state && state.currentStep) {
      console.log(`\n🔥 Resuming FirePRD workflow from step: ${state.currentStep}\n`);
      this.workflowManager.setState(state);
    } else {
      console.log('\n🔥 Starting new FirePRD workflow\n');
      await this.workflowManager.initialize();
    }

    return this.executeWorkflow();
  }

  /**
   * Execute the workflow step by step
   */
  async executeWorkflow() {
    const currentStep = this.workflowManager.getCurrentStep();

    switch (currentStep) {
      case 'analysis':
        return await this.performAnalysis();
      
      case 'structure':
        return await this.collaborateOnStructure();
      
      case 'content':
        return await this.collaborateOnContent();
      
      case 'generation':
        return await this.generatePRD();
      
      case 'complete':
        return this.complete();
      
      default:
        throw new Error(`Unknown workflow step: ${currentStep}`);
    }
  }

  /**
   * Step 1: Code Analysis (automated)
   * Uses CodeAnalystPersona for automated code analysis
   */
  async performAnalysis() {
    console.log('📊 Step 1: Analyzing source code...\n');
    this.currentPersona = this.codeAnalyst;
    
    const analysis = await this.codeAnalyst.analyzeProject(this.projectPath);
    
    await this.workflowManager.saveStepData('analysis', analysis);
    await this.saveState();
    
    console.log('\n✅ Analysis complete!\n');
    
    this.workflowManager.moveToNextStep();
    await this.saveState();
    
    return this.executeWorkflow();
  }

  /**
   * Step 2: Collaborate on Structure
   * Uses PRDWriterPersona to collaborate with user on document structure
   */
  async collaborateOnStructure() {
    console.log('📝 Step 2: Defining PRD structure...\n');
    this.currentPersona = this.prdWriter;
    
    const analysis = this.workflowManager.getStepData('analysis');
    const structure = await this.prdWriter.collaborateOnStructure(analysis);
    
    await this.workflowManager.saveStepData('structure', structure);
    await this.saveState();
    
    console.log('\n✅ Structure defined!\n');
    
    this.workflowManager.moveToNextStep();
    await this.saveState();
    
    return this.executeWorkflow();
  }

  /**
   * Step 3: Collaborate on Content
   * Uses PRDWriterPersona to collaborate with user on document content
   */
  async collaborateOnContent() {
    console.log('✍️  Step 3: Refining content...\n');
    this.currentPersona = this.prdWriter;
    
    const analysis = this.workflowManager.getStepData('analysis');
    const structure = this.workflowManager.getStepData('structure');
    const content = await this.prdWriter.collaborateOnContent(analysis, structure);
    
    await this.workflowManager.saveStepData('content', content);
    await this.saveState();
    
    console.log('\n✅ Content refined!\n');
    
    this.workflowManager.moveToNextStep();
    await this.saveState();
    
    return this.executeWorkflow();
  }

  /**
   * Step 4: Generate Final PRD
   */
  async generatePRD() {
    console.log('🎯 Step 4: Generating final PRD...\n');
    this.currentPersona = this.prdWriter;
    
    const analysis = this.workflowManager.getStepData('analysis');
    const structure = this.workflowManager.getStepData('structure');
    const content = this.workflowManager.getStepData('content');
    
    const prd = await this.prdWriter.generateFinalPRD(analysis, structure, content);
    
    await this.workflowManager.saveStepData('prd', prd);
    await this.saveState();
    
    console.log('\n✅ PRD generated!\n');
    
    this.workflowManager.moveToNextStep();
    await this.saveState();
    
    return this.executeWorkflow();
  }

  /**
   * Complete the workflow
   */
  complete() {
    const prd = this.workflowManager.getStepData('prd');
    console.log('🎉 FirePRD workflow complete!\n');
    console.log('📄 Your PRD has been generated.\n');
    
    return {
      success: true,
      prd: prd,
      message: 'PRD generation complete'
    };
  }

  /**
   * Save current state for resumability
   */
  async saveState() {
    const state = this.workflowManager.getState();
    await this.stateManager.save(state);
  }

  /**
   * Get current workflow status
   */
  getStatus() {
    return {
      currentStep: this.workflowManager.getCurrentStep(),
      currentPersona: this.currentPersona?.getName(),
      progress: this.workflowManager.getProgress()
    };
  }
}

module.exports = FirePRDAgent;
