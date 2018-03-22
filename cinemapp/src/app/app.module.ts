import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule } from '@angular/common/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { LocalStorageModule } from './core/local-storage';
import { OfflineModule } from './core/offline';
import { LayoutModule } from './ui/layout';
import { CinemaModule } from './cinema/cinema.module';
import { AccountModule } from './account/account.module';
import { OopsModule } from './oops/oops.module';
import { AppComponent } from './app.component';
import { AuthModule } from './core/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    HttpClientModule,
    NoopAnimationsModule,
    MatSnackBarModule,
    LocalStorageModule,
    OfflineModule.forRoot({ routeOffline: '/oops/offline', routeUnavailable: '/oops/unavailable' }),
    LayoutModule,
    CinemaModule,
    AccountModule,
    OopsModule,
    AppRoutingModule,
    AuthModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
