// IMPORTANT:
// Change this mode depends on environment
const mode = 'prod'; // dev | prod | local

const configuration = {
    local: {
        apiUrl: 'http://localhost:3001/api/v1/',
    },
    dev: {
        apiUrl: 'http://localhost:3001/api/v1/', // dev env using local endpoint
    },
    prod: {
        apiUrl: 'https://152.42.217.143/api/v1/',
    }
};

const config = configuration[mode];

const devMode = (mode !== 'prod') ? true :  false;

const IS_PROD = import.meta.env.PROD

const CACHE_REVALIDATION = 60 // 1 minute

export {
    config,
    devMode,
    IS_PROD,
    CACHE_REVALIDATION
};