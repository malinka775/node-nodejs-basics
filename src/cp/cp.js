import { spawn } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { pipeline } from 'stream';

const spawnChildProcess = async (args) => {
    const execFilePath = fileURLToPath(import.meta.url);
    const execDirectory = dirname(execFilePath);
    const childScriptPath = join(execDirectory, 'files', 'script.js');

    const childProcess = spawn('node', [childScriptPath, [...args]]);

    pipeline(process.stdin, childProcess.stdin, () => (err) => {
        if (err) {
            throw e;
        }
    });

    pipeline(childProcess.stdout, process.stdout, (err) => {
        if (err) {
            throw e;
        }
    });
};

spawnChildProcess( [3, 4, 8]);

