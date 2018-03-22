import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { Theater } from '../../shared/theater';
import { Schedule } from '../../shared/schedule';
import { CinemaService } from '../../shared/cinema.service';
import { Offline } from '../../../core/offline';

@Component({
  template: `
    <div>
      <div *ngIf="theater$ | async as theater; else loading">
        <cinemapp-theaters-item [theater]="theater"></cinemapp-theaters-item>
        <cinemapp-theater-schedules [schedulesGroups]="schedulesGroups$ | async"></cinemapp-theater-schedules>
      </div>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </ng-template>
    </div>
  `
})
export class TheaterComponent implements OnInit {

  theater$: Observable<Theater>;
  schedulesGroups$: Observable<Schedule[][]>;

  constructor(protected cinema: CinemaService, protected route: ActivatedRoute, protected offline: Offline) { }

  ngOnInit() {

    this.theater$ = this.route.paramMap.pipe(
      map((params) => Number.parseInt(params.get('id') || '1', 10)),
      switchMap((id) => this.cinema.getTheater(id)),
      this.offline.catch()
    );

    this.schedulesGroups$ = this.theater$.pipe(map((theater) => this.cinema.groupTheaterSchedules(theater.schedules || [])));

  }

}
