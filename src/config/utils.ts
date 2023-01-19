export function ensureEnvVars(
    config: { [key: string]: any },
    keys: string[],
    prefix?: string,
) {
    for (const reqKey of keys) {
        if (config[reqKey] === undefined) {
            const keyName = prefix ? `${prefix}.${reqKey}` : `${reqKey}`;
            throw new Error(`missing config value: '${keyName}'`);
        }
    }
}
