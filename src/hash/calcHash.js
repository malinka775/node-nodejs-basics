import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { stdout } from 'process';
import { FS_ERROR_TEXT, isDestinationExisting } from '../helpers.js';

const calculateHash = async () => {
    let crypto
    const TARGET_FILENAME = 'fileToCalCulateHashFor.txt'
    try {
        const execFilePath = fileURLToPath(import.meta.url);
        const execDirname = dirname(execFilePath);
        const targetFilePath = join(execDirname, 'files', TARGET_FILENAME)

        if(!await isDestinationExisting(targetFilePath)) {
            throw new Error(FS_ERROR_TEXT);
        }

        crypto = await import('node:crypto');

        const input = fs.createReadStream(targetFilePath);
        const hash = crypto.createHash('sha256');
        input.pipe(hash).setEncoding('hex').pipe(stdout);
    } catch (e) {
        throw e
    }
};

await calculateHash();
