/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { ensureEnvVars } from './utils';

const { env } = process;
export default () => {
    const config = {
        db: {
            hostname: env.DB_HOSTNAME!,
            port: parseInt(env.DB_PORT!, 10),
            username: env.DB_USERNAME!,
            password: env.DB_PASSWORD!,
            databaseName: env.DB_NAME!,
            timeoutMillis: parseInt(env.TIMEOUT_MILLIS!, 10),
        },
    };

    ensureEnvVars(config.db, Object.keys(config.db), 'db');
    return config;
};
