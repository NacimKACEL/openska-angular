import { InjectionToken } from '@angular/core';

import { OfflineConfig } from './offline-config';

export const OFFLINE_CONFIG = new InjectionToken<OfflineConfig>('offline-config');
