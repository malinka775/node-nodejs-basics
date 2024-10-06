import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { promisify } from 'util';
import { pipeline } from 'stream';
import { isDestinationExisting } from '../helpers.js';

const compress = async () => {
    try {
        const execFilePath = fileURLToPath(import.meta.url);
        const execDirPath = dirname(execFilePath);
        const sourcePath = join(execDirPath, 'files', 'fileToCompress.txt');
        const destinationPath = join(execDirPath, 'files', 'archive.gz');
        
        if (!await isDestinationExisting(sourcePath)) {
            console.log('Operation failed: unfortunately the source file is not found');
            return
        }
        
        const gzip = createGzip();
        const rs = createReadStream(sourcePath);
        const ws = createWriteStream(destinationPath);
        
        const promisifiedPipeline = promisify(pipeline);
        await promisifiedPipeline(
            rs,
            gzip,
            ws
        );
    } catch(e) {
        throw e;
    }
};

await compress();
