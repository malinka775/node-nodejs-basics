import { parentPort } from 'worker_threads';

const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    parentPort.on('message', (number) => {
        const result = nthFibonacci(number)
        parentPort.postMessage(result)
        parentPort.close();
    })
};

sendResult();
