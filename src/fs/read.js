import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { FS_ERROR_TEXT, isDestinationExisting } from '../helpers.js';

const read = async () => {
    const TARGET_FILE_NAME = 'fileToRead.txt';
    const execFilePath = fileURLToPath(import.meta.url);
    const execDirname = dirname(execFilePath);
    const targetFilePath = join(execDirname, 'files', TARGET_FILE_NAME);

    try {
        if(!await isDestinationExisting(targetFilePath)) {
            throw new Error(FS_ERROR_TEXT);
        }
        const content = await fs.readFile(targetFilePath, 'utf-8')
        console.log(content);
    } catch(err) {
        throw err;
    }
};

await read();
