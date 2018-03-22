import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map, switchMap } from 'rxjs/operators';

import { Movie } from '../../shared/movie';
import { Schedule } from '../../shared/schedule';
import { CinemaService } from '../../shared/cinema.service';
import { Offline } from '../../../core/offline';

/** @todo Manage loading */
@Component({
  template: `
    <div>
      <div *ngIf="movie$ | async as movie">
        <cinemapp-movie-details [movie]="movie"></cinemapp-movie-details>
        <cinemapp-movie-schedules [schedulesGroups]="schedulesGroups$ | async"></cinemapp-movie-schedules>
      </div>
      <ng-template #loading>
        <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
      </ng-template>
    </div>
  `,
})
export class MovieComponent implements OnInit {

  movie$: Observable<Movie>;
  schedulesGroups$: Observable<Schedule[][]>;

  constructor(protected cinema: CinemaService, protected route: ActivatedRoute, protected offline: Offline) { }

  ngOnInit() {

    /**
     * @todo Upgrade to dynamic parameter
     * @todo Manage offline errors
     */
    //const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || '1');

    this.route.paramMap.pipe(
      map((paramMap) =>  Number.parseInt(paramMap.get('id') || '1')),
      switchMap((id) => this.cinema.getMovie(id)),
      this.offline.catch()
    );

    //this.movie$ = this.cinema.getMovie(id);

    this.schedulesGroups$ = this.movie$.pipe(map((movie) => this.cinema.groupMovieSchedules(movie.schedules || [])));

  }

}
