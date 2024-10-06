import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { FS_ERROR_TEXT, isDestinationExisting } from '../helpers.js';

const list = async () => {
    const TARGET_DIR_NAME = 'files';
    const execPath = fileURLToPath(import.meta.url);
    const execDirPath = dirname(execPath);
    const targetDirPath = join(execDirPath, TARGET_DIR_NAME);
    try {
        const targetDirStats = await isDestinationExisting(targetDirPath);
        if(!targetDirStats || !targetDirStats.isDirectory()) {
            throw new Error(FS_ERROR_TEXT);
        }
        const contents = await fs.readdir(targetDirPath);
        const promises = contents.map((item) => {
            return new Promise((res, rej) => {
                fs.stat(join(targetDirPath, item)).then((stats) => {
                    stats.isFile() ? res(item) : res(null)
                }).catch((err) => {rej(err)})
            })
        })
        const files = (await Promise.all(promises)).filter(el => el !== null)
        console.log(files);
    } catch(err) {
        throw err;
    }
};

await list();
