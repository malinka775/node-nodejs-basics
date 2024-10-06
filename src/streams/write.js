import { createWriteStream } from 'fs';
import { stdin } from 'process';
import { pipeline } from 'stream';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const write = async () => {
    try {
        const execFilePath = fileURLToPath(import.meta.url);
        const execDirPath = dirname(execFilePath);
        const targetFilePath = join(execDirPath, 'files', 'fileToWrite.txt');

        const myWriteStream = createWriteStream(targetFilePath);
        const myReadStream = stdin;

        pipeline(
            myReadStream,
            myWriteStream,
            (e) => {
                if(e){
                    throw e
                }
            }
        );
    } catch(err) {
        throw err;
    }
};

await write();
