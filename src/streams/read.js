import { createReadStream } from 'fs';
import { stdout } from 'process';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { addNewLineStream } from '../helpers.js';

const read = async () => {
    try {
        const execFilePath = fileURLToPath(import.meta.url);
        const execDirPath = dirname(execFilePath);
        const targetFilePath = join(execDirPath, 'files', 'fileToRead.txt');

        const myReadStream = createReadStream(targetFilePath);
        pipeline(
            myReadStream,
            addNewLineStream,
            stdout,
            (e) => {
                if (e) {
                    throw e;
                }
            },
        );
    } catch(e) {
        throw e;
    }
};

await read();
