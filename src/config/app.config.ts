import { ensureEnvVars } from './utils';

const { env } = process;
export default () => {
    const config = {
        app: {
            host: env.APP_HOST ?? 'localhost',
            port: parseInt(env.APP_PORT ?? '8080', 10),
        },
    };

    ensureEnvVars(config.app, Object.keys(config.app), 'app');
    return config;
};
