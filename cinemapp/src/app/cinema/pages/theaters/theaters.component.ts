import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Theater } from '../../shared/theater';
import { CinemaService } from '../../shared/cinema.service';
import { Offline } from '../../../core/offline';

@Component({
  template: `
    <div>
      <cinemapp-theaters-list *ngIf="theaters$ | async as theaters; else loading" [theaters]="theaters"></cinemapp-theaters-list>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate" *ngIf="!theaters"></mat-progress-spinner></div>
      </ng-template>
    </div>
  `
})
export class TheatersComponent implements OnInit {

  theaters$: Observable<Theater[]>;

  constructor(protected cinema: CinemaService, protected offline: Offline) { }

  ngOnInit() {

    this.theaters$ = this.cinema.getTheaters().pipe(this.offline.catch());

  }

}
