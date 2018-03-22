import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { catchError, filter } from 'rxjs/operators';

import { OfflineConfig } from './offline-config';
import { OFFLINE_CONFIG } from './tokens';

@Injectable()
export class Offline {

  constructor(
    protected router: Router,
    @Inject(PLATFORM_ID) protected platformId: string,
    @Inject(OFFLINE_CONFIG) protected config: OfflineConfig) {}

  catch<T>() {

    return catchError<T, T>((error, caught) => {

      const cancel = caught.pipe(filter(() => false));

      if (isPlatformBrowser(this.platformId) && !navigator.onLine) {

        this.router.navigate([this.config.routeOffline]);

        return cancel;

      } else if (error.status && (error.status >= 500 && error.status < 600)) {

        this.router.navigate([this.config.routeUnavailable]);

        return cancel;

      } else {

        throw error;

      }

    });

  }

}
