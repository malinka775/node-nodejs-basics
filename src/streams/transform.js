import { Transform, pipeline } from 'stream';

const reverseTransformStream = new Transform({
    transform(chunk, encoding, callback) {
        const string = chunk.toString().trim();
        const reversed = string.split('').reverse().join('');
        const result = reversed + '\n'
        
        this.push(result);
        callback();
    },
    flush(callback) {
        callback();
    }
})

const transform = async () => {
    pipeline(
        process.stdin,
        reverseTransformStream,
        process.stdout,
        (error) => {
            if(error){
                throw error;
            }
        }
    );
};

await transform();
