import { InjectionToken } from '@angular/core';

export interface EnvironmentConfig {
  environment: {
    apiURL: string;
  };
}

export const ENV_CONFIG = new InjectionToken<EnvironmentConfig>(
  'EnvironmentConfig'
);
