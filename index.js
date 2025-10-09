/**
 * FirePRD Main Entry Point
 * 
 * Exports the main components of the FirePRD framework.
 */

const FirePRDAgent = require('./src/agents/FirePRDAgent');
const CodeAnalystPersona = require('./src/personas/CodeAnalystPersona');
const PRDWriterPersona = require('./src/personas/PRDWriterPersona');
const WorkflowManager = require('./src/workflow/WorkflowManager');
const StateManager = require('./src/state/StateManager');

module.exports = {
  FirePRDAgent,
  CodeAnalystPersona,
  PRDWriterPersona,
  WorkflowManager,
  StateManager
};
