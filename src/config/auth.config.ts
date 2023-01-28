import { ensureEnvVars } from './utils';

const { env } = process;
export default () => {
    const config = {
        auth: {
            saltRounds: parseInt(env.AUTH_SALT_ROUNDS ?? '10', 10),
        },
    };

    ensureEnvVars(config.auth, Object.keys(config.auth), 'auth');
    return config;
};
