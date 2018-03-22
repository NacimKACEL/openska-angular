import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [AuthService,
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}]
})
export class AuthModule { }
