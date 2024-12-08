import { exec } from 'child_process';
import { writeFile, unlink } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

const TIMEOUT = 10000; // 10 seconds timeout

async function createTempFile(content, extension) {
  const tempPath = join(tmpdir(), `code-${Date.now()}${extension}`);
  await writeFile(tempPath, content);
  return tempPath;
}

function executeCommand(command) {
  return new Promise((resolve, reject) => {
    const process = exec(command, {
      timeout: TIMEOUT,
      maxBuffer: 1024 * 1024, // 1MB output buffer
    }, (error, stdout, stderr) => {
      if (error) {
        reject(new Error(stderr || error.message));
        return;
      }
      resolve(stdout);
    });
  });
}

export async function runCode(code, language) {
  let tempFile = null;
  try {
    switch (language) {
      case 'javascript':
        return await executeCommand(`node -e "${code.replace(/"/g, '\\"')}"`);
      
      case 'python':
        tempFile = await createTempFile(code, '.py');
        return await executeCommand(`python3 ${tempFile}`);
      
      case 'java': {
        const className = 'Main';
        tempFile = await createTempFile(code, '.java');
        await executeCommand(`javac ${tempFile}`);
        const classPath = tempFile.replace('.java', '');
        return await executeCommand(`java ${className}`);
      }
      
      default:
        throw new Error(`Language ${language} is not supported`);
    }
  } finally {
    if (tempFile) {
      try {
        await unlink(tempFile);
        // Also try to remove compiled Java class file if it exists
        if (language === 'java') {
          await unlink(tempFile.replace('.java', '.class'));
        }
      } catch (error) {
        console.error('Error cleaning up temp files:', error);
      }
    }
  }
}