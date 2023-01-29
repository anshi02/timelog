/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { ensureEnvVars } from './utils';

const { env } = process;
export default () => {
    const config = {
        auth: {
            saltRounds: parseInt(env.AUTH_SALT_ROUNDS ?? '10', 10),
            jwtSecretKey: env.AUTH_JWT_SECRET_KEY!,
            jwtValidityDays: parseInt(env.AUTH_JWT_VALIDITY_DAYS ?? '15', 10),
        },
    };

    ensureEnvVars(config.auth, Object.keys(config.auth), 'auth');
    return config;
};
