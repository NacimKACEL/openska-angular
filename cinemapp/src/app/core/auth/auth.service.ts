import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  isConnected = new BehaviorSubject(false);

  tokenValue: string | null = null;

  readonly tokenKey = 'access_token';

  constructor() {
    this.tokenValue = localStorage.getItem(this.tokenKey);
    this.isConnected.next(!!this.tokenValue);
  }

  connect(token: string) {
    this.isConnected.next(true);
    this.tokenValue = token;
    localStorage.setItem(this.tokenKey, this.tokenValue);
  }

  disconnect() {
    this.isConnected.next(false);
    this.tokenValue = null;
    localStorage.removeItem(this.tokenKey);
  }

  getToken() {
    return this.tokenValue;
  }

}
