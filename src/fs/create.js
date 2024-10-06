import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const create = async () => {
    const destination = fileURLToPath(new URL('./files/fresh.txt', import.meta.url).href);
    const text = 'I am fresh and young';
    let fd;
    
    try {
        fd = await fs.open(destination, 'wx')
        await fs.writeFile(destination, text)
    } catch(err) {
        if(err.code === 'EEXIST') {
            throw new Error('FS operation failed')
        } 
        throw err;
    } finally {
        fd?.close();
    }
};

await create();
