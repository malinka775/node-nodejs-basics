import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import {isDestinationExisting, FS_ERROR_TEXT} from '../helpers.js';


const rename = async () => {
    const baseDirname = 'files';
    const wrongFilename = 'wrongFilename.txt';
    const properFilename = 'properFilename.md';

    const wrongPath = fileURLToPath(new URL(`${baseDirname}/${wrongFilename}`, import.meta.url).href);
    const properPath = fileURLToPath(new URL(`${baseDirname}/${properFilename}`, import.meta.url).href);

    try {
        if(!await isDestinationExisting(wrongPath)) {
            throw new Error(FS_ERROR_TEXT);
        }
        
        if(await(isDestinationExisting(properPath))) {
            throw new Error(FS_ERROR_TEXT);
        }

        await fs.rename(wrongPath, properPath)
    } catch(err) {
        throw err;
    }
};

await rename();
