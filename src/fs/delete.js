import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { FS_ERROR_TEXT } from '../helpers.js';

const remove = async () => {
    const execPath = fileURLToPath(import.meta.url);
    const execDirname = dirname(execPath);
    const pathToRemove = join(execDirname, 'files', 'fileToRemove.txt');

    try {
        await fs.unlink(pathToRemove);
    } catch(err) {
        if (err.code === 'ENOENT') {
            throw new Error(FS_ERROR_TEXT)
        }
        throw err;
    }
};

await remove();
