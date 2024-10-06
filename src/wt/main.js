import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { Worker } from 'worker_threads';
import { cpus } from 'os';

const performCalculations = async () => {
    const mainThreadPath = fileURLToPath(import.meta.url);
    const dirPath = dirname(mainThreadPath)
    const workerPath = join(dirPath, 'worker.js');

    const coresNumber = cpus().length;

    const promises = [];

    for (let i = 0; i < coresNumber; i++) {
        promises[i] = new Promise((resolve, _) => {
            const worker = new Worker(workerPath);
            worker.postMessage(10+i);
            worker.on('message', (res) => {
                resolve({ status: 'resolved', data: res})
            })
            worker.on('error', () => {
                resolve({ status: 'error', data: null })
            })
        })
    }
    const result = await Promise.all(promises);
    console.log(result)
};

await performCalculations();
