import fs from 'fs/promises';
import { fileURLToPath } from 'url';

const copy = async () => {
    const sourceDir = './files'
    const destinationDir = './files_copy'

    const src = fileURLToPath(new URL(sourceDir, import.meta.url).href);
    const dest = fileURLToPath(new URL(destinationDir, import.meta.url).href);

    
    try {
        const srcStats = await fs.stat(src);
        if (srcStats.isDirectory()) {
            await fs.mkdir(dest, { recursive: false })
            const srcFiles = await fs.readdir(src);
            for (const file of srcFiles) {
                const filePath = fileURLToPath(new URL(`${sourceDir}/${file}`, import.meta.url).href)
                const destinationPath = fileURLToPath(new URL(`${destinationDir}/${file}`, import.meta.url).href)
                await fs.copyFile(filePath, destinationPath)
            }
        }
    } catch(err) {
        if (
            err.code === 'ENOENT' && err.path === src || 
            err.code === 'EEXIST' && err.path === dest
        ) {
            throw new Error('FS operation failed')
        }
    }
};

await copy();
