import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createGunzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { isDestinationExisting } from '../helpers.js';

const decompress = async () => {
    try {
        const execFilePath = fileURLToPath(import.meta.url);
        const execDirPath = dirname(execFilePath);
        const sourcePath = join(execDirPath, 'files', 'archive.gz');
        const destinationPath = join(execDirPath, 'files', 'fileToCompress.txt');

        if (!await isDestinationExisting(sourcePath)) {
            console.log('Operation failed: unfortunately the source file is not found');
            return
        }

        const unzip = createGunzip();
        const promisifiedPipeline = promisify(pipeline);
        const rs = createReadStream(sourcePath);
        const ws = createWriteStream(destinationPath);

        promisifiedPipeline(rs, unzip, ws);
    } catch(e) {
        throw e
    }
};

await decompress();
