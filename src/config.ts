export interface Config {
  security: {
    tokenExpirationTime: number;
  }
}

export const defaultConfig: Config = {
  security: {
    tokenExpirationTime: 3600
  }
}

export function activeConfig(): Config {
  return defaultConfig;
}