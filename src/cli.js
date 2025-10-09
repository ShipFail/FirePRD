#!/usr/bin/env node

/**
 * FirePRD CLI
 * 
 * Command-line interface for the FirePRD framework.
 */

const FirePRDAgent = require('./agents/FirePRDAgent');
const fs = require('fs').promises;
const path = require('path');

async function main() {
  const args = process.argv.slice(2);
  
  console.log('\n🔥 FirePRD - Transform your code into clear, product-focused documentation\n');

  if (args.includes('--help') || args.includes('-h')) {
    showHelp();
    return;
  }

  if (args.includes('--version') || args.includes('-v')) {
    const packageJson = require('../package.json');
    console.log(`FirePRD v${packageJson.version}\n`);
    return;
  }

  let projectPath = process.cwd();
  
  const pathIndex = args.indexOf('--path');
  if (pathIndex !== -1 && args[pathIndex + 1]) {
    projectPath = path.resolve(args[pathIndex + 1]);
  }

  try {
    await fs.access(projectPath);
  } catch (error) {
    console.error(`❌ Error: Project path not found: ${projectPath}\n`);
    process.exit(1);
  }

  console.log(`📁 Project path: ${projectPath}\n`);

  const agent = new FirePRDAgent(projectPath);
  
  try {
    const result = await agent.start();
    
    if (result.success && result.prd) {
      const outputPath = path.join(projectPath, 'PRD.md');
      await fs.writeFile(outputPath, result.prd.document, 'utf8');
      console.log(`\n📄 PRD saved to: ${outputPath}\n`);
    }
  } catch (error) {
    console.error(`\n❌ Error: ${error.message}\n`);
    process.exit(1);
  }
}

function showHelp() {
  console.log('Usage: fireprd [options]\n');
  console.log('Options:');
  console.log('  --path <path>    Path to the project to analyze (default: current directory)');
  console.log('  --help, -h       Show this help message');
  console.log('  --version, -v    Show version information\n');
  console.log('Description:');
  console.log('  FirePRD is a prompt-based framework that generates human-centric PRDs from source code.');
  console.log('  It uses a stateful, user-directed workflow managed by a central agent, making it resumable.');
  console.log('  The agent first analyzes code, then collaborates with you on structure and content\n');
  console.log('  before generating the final PRD document.\n');
}

if (require.main === module) {
  main().catch(error => {
    console.error(`\n❌ Fatal error: ${error.message}\n`);
    process.exit(1);
  });
}

module.exports = { main };
