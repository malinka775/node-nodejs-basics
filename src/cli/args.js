const parseArgs = () => {
    const TARGET_PREFIX = '--'
    const args = process.argv;
    const resultArr = args.reduce((acc, arg, i, arr) => {
        if(arg.startsWith(TARGET_PREFIX)) {
            const argName = arg.slice(2);
            acc.push(`${argName} is ${arr[i+1]}`)
        }
        return acc;
    }, [])
    console.log(resultArr.join(', '))
};

parseArgs();
