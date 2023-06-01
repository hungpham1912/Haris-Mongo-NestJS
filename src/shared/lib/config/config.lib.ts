import { Logger } from '@nestjs/common';
import config = require('config');

export function getConfig(key: string, defaultValue: any = null) {
  try {
    const value = config.get(key);
    if (typeof value === 'undefined') {
      return defaultValue;
    }
    return value;
  } catch (error) {
    Logger.error(`🚀 ~ file: config.lib.ts:12 ~ getConfig: ${error}`);
    return;
  }
}
