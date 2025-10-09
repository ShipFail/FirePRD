/**
 * State Manager
 * 
 * Manages persistence of workflow state to enable resumable workflows.
 */

const fs = require('fs').promises;
const path = require('path');

class StateManager {
  constructor(stateFile = '.fireprd-state.json') {
    this.stateFile = stateFile;
  }

  /**
   * Load state from file
   */
  async load() {
    try {
      const stateData = await fs.readFile(this.stateFile, 'utf8');
      return JSON.parse(stateData);
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  /**
   * Save state to file
   */
  async save(state) {
    const stateData = JSON.stringify(state, null, 2);
    await fs.writeFile(this.stateFile, stateData, 'utf8');
  }

  /**
   * Clear saved state
   */
  async clear() {
    try {
      await fs.unlink(this.stateFile);
    } catch (error) {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }
  }

  /**
   * Check if state file exists
   */
  async exists() {
    try {
      await fs.access(this.stateFile);
      return true;
    } catch {
      return false;
    }
  }
}

module.exports = StateManager;
