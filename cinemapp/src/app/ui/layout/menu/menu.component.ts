import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cinemapp-menu',
  template: `
    <mat-toolbar color="primary">
      <a routerLink="/cinema/movies" routerLinkActive="nav-active"><mat-icon>movie</mat-icon> Films</a>
      <a routerLink="/cinema/theaters" routerLinkActive="nav-active"><mat-icon>local_movies</mat-icon> Cinémas</a>
      <a *ngIf="isConnected" routerLink="/account/profile" routerLinkActive="nav-active">
        <mat-icon>account_circle</mat-icon>Mes résas
      </a>
      <a *ngIf="!isConnected" routerLink="/account/login" routerLinkActive="nav-active">
        <mat-icon>account_circle</mat-icon>Compte
      </a>
    </mat-toolbar>
  `,
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MenuComponent {

  @Input() isConnected = false;

}
