import { getConfig } from '../lib/config/config.lib';

export const ENV_CONFIG = {
  database: {
    url: getConfig('database.url'),
  },
  system: {
    port: getConfig('system.port') || 3000,
    apiVersion: getConfig('system.api_version'),
  },
};
