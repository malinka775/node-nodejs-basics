import fs from 'fs';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { stdout } from 'process';
import { FS_ERROR_TEXT, isDestinationExisting } from '../helpers.js';

const addNewLine = new Transform({
    transform(chunk, encoding, callback) {
        this.push(chunk);
        callback();
    },
    flush(callback) {
        this.push('\n');
        callback();
    }
})

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
        input.pipe(hash).setEncoding('hex').pipe(addNewLine).pipe(stdout);
        
    } catch (e) {
        throw e
    }
};

await calculateHash();
