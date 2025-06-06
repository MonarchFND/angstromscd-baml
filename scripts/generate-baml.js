import { invoke_runtime_cli } from '@boundaryml/baml';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

async function generateClient() {
  try {
    console.log('🔄 Generating BAML client...');
    
    const result = await invoke_runtime_cli(['generate', 'generate'], {
      cwd: projectRoot
    });
    
    console.log('✅ BAML client generated successfully!');
    console.log('📁 Generated files in: baml_client/');
    
    return result;
  } catch (error) {
    console.error('❌ Failed to generate BAML client:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateClient();
}

export { generateClient }; 