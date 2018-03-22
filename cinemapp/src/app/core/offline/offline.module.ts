import { NgModule, ModuleWithProviders } from '@angular/core';

import { Offline } from './offline.service';
import { OFFLINE_CONFIG } from './tokens';
import { OfflineConfig } from './offline-config';

const defaultConfig: OfflineConfig = {
  routeOffline: '/offline',
  routeUnavailable: '/unavailable'
};

@NgModule({
  providers: [
    { provide: OFFLINE_CONFIG, useValue: defaultConfig },
    Offline,
  ]
})
export class OfflineModule {

  static forRoot(userConfig: OfflineConfig): ModuleWithProviders {

    return {
      ngModule: OfflineModule,
      providers: [{ provide: OFFLINE_CONFIG, useValue: userConfig }]
    };

  }

}
