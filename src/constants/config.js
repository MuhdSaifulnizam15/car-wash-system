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
        apiUrl: 'https://api.carwashshop.com/api/v1/',
    }
};

const config = configuration[mode];

const devMode = (mode != 'prod') ? true :  false;

const IS_PROD = process.env.NODE_ENV === 'production'

const CACHE_REVALIDATION = 60 // 1 minute

export default {
    config,
    devMode,
    IS_PROD,
    CACHE_REVALIDATION
};