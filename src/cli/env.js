const parseEnv = () => {
    const TARGET_PREFIX = 'RSS_';
    const envObject = process.env;
    const targetKeys = Object.keys(envObject).filter(item => item.startsWith(TARGET_PREFIX));
    const result = targetKeys.map(key => `${key}=${envObject[key]}`).join('; ');
    console.log(result);
};

parseEnv();
