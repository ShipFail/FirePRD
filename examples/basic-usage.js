/**
 * Basic Usage Example
 * 
 * This example demonstrates how to use FirePRD programmatically.
 */

const { FirePRDAgent } = require('../index');
const path = require('path');

async function example() {
  console.log('🔥 FirePRD Basic Usage Example\n');

  // Create a new FirePRD agent for your project
  const projectPath = path.resolve(__dirname, '../'); // Analyze the FirePRD project itself
  const agent = new FirePRDAgent(projectPath);

  console.log('Starting PRD generation workflow...\n');

  // Start the workflow (this is resumable - if interrupted, run again to resume)
  const result = await agent.start();

  // Check the result
  if (result.success) {
    console.log('\n✅ PRD generation complete!');
    console.log('\nGenerated PRD:');
    console.log('─'.repeat(50));
    console.log(result.prd.document);
    console.log('─'.repeat(50));
  } else {
    console.error('❌ PRD generation failed');
  }

  // Check workflow status
  const status = agent.getStatus();
  console.log('\nWorkflow Status:');
  console.log(`  Current Step: ${status.currentStep}`);
  console.log(`  Current Persona: ${status.currentPersona}`);
  console.log(`  Progress: ${status.progress}%`);
}

// Run the example
if (require.main === module) {
  example().catch(error => {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { example };
