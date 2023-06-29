import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {
  EnvironmentConfig,
  ENV_CONFIG,
} from './interfaces/environment-config.interface';

@NgModule({
  imports: [BrowserModule, CommonModule],
})
export class HttpModule {
  static forRoot(config: EnvironmentConfig): ModuleWithProviders<HttpModule> {
    return {
      ngModule: HttpModule,
      providers: [
        {
          provide: ENV_CONFIG,
          useValue: config,
        },
      ],
    };
  }
}
