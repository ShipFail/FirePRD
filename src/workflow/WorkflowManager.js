/**
 * Workflow Manager
 * 
 * Manages the stateful workflow steps for PRD generation.
 * Keeps track of current step, completed steps, and step data.
 */

class WorkflowManager {
  constructor() {
    this.steps = ['analysis', 'structure', 'content', 'generation', 'complete'];
    this.currentStepIndex = 0;
    this.stepData = {};
    this.initialized = false;
  }

  /**
   * Initialize a new workflow
   */
  async initialize() {
    this.currentStepIndex = 0;
    this.stepData = {};
    this.initialized = true;
  }

  /**
   * Get current step name
   */
  getCurrentStep() {
    return this.steps[this.currentStepIndex];
  }

  /**
   * Move to next step in workflow
   */
  moveToNextStep() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
    }
  }

  /**
   * Save data for a specific step
   */
  async saveStepData(stepName, data) {
    this.stepData[stepName] = data;
  }

  /**
   * Get data for a specific step
   */
  getStepData(stepName) {
    return this.stepData[stepName];
  }

  /**
   * Get current workflow state (for persistence)
   */
  getState() {
    return {
      currentStep: this.getCurrentStep(),
      currentStepIndex: this.currentStepIndex,
      stepData: this.stepData,
      initialized: this.initialized
    };
  }

  /**
   * Restore workflow state (for resuming)
   */
  setState(state) {
    if (state.currentStepIndex !== undefined) {
      this.currentStepIndex = state.currentStepIndex;
    }
    if (state.stepData) {
      this.stepData = state.stepData;
    }
    if (state.initialized !== undefined) {
      this.initialized = state.initialized;
    }
  }

  /**
   * Get workflow progress percentage
   */
  getProgress() {
    return Math.round((this.currentStepIndex / (this.steps.length - 1)) * 100);
  }

  /**
   * Check if workflow is complete
   */
  isComplete() {
    return this.getCurrentStep() === 'complete';
  }
}

module.exports = WorkflowManager;
