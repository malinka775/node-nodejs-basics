import fs from 'fs/promises';
import { dirname, join, sep } from 'path';
import { fileURLToPath } from 'url';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import { FS_ERROR_TEXT, isDestinationExisting } from '../helpers.js';
import './files/c.js';

const execFilePath = fileURLToPath(import.meta.url);
const execDirname = dirname(execFilePath);

const aJsonLocation = join(execDirname, 'files', 'a.json');
const bJsonLocation = join(execDirname, 'files', 'b.json');

const random = Math.random();

let unknownObject;

try {
    let targetLocation
    if (random > 0.5) {
        targetLocation = aJsonLocation
    } else {
        targetLocation = bJsonLocation;
    }
    if(!await isDestinationExisting(targetLocation)) {
        throw Error(FS_ERROR_TEXT)
    }
    const content = await fs.readFile(targetLocation, 'utf-8')
    unknownObject = content;
} catch (err) {
    throw err
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${execFilePath}`);
console.log(`Path to current directory is ${execDirname}`);

const myServer = createServerHttp((_, res) => {
    res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log('To terminate it, use Ctrl+C combination');
});

export {
    unknownObject,
    myServer,
};

