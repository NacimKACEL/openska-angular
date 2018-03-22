import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Movie } from '../../shared/movie';
import { CinemaService } from '../../shared/cinema.service';
import { Offline } from '../../../core/offline';
import { Slide } from '../../../ui/slideshow';

@Component({
  template: `
    <div>
      <div>
        <mat-toolbar><span>Films à la une</span></mat-toolbar>
        <cinemapp-slideshow delay="3000" *ngIf="slides$ | async as slides; else slidesLoading">
          <cinemapp-slide *ngFor="let slide of slides" [slide]="slide"></cinemapp-slide>
        </cinemapp-slideshow>
        <ng-template #slidesLoading class="center">
          <mat-progress-spinner mode="indeterminate"></mat-progress-spinner>
        </ng-template>
      </div>
      <div>
        <mat-toolbar><span>Tous les films</span></mat-toolbar>
        <cinemapp-movies-list *ngIf="movies$ | async as movies; else moviesLoading" [movies]="movies"></cinemapp-movies-list>
        <ng-template #moviesLoading>
          <div class="center"><mat-progress-spinner mode="indeterminate"></mat-progress-spinner></div>
        </ng-template>
      </div>
    </div>
  `
})
export class MoviesComponent implements OnInit {

  movies$: Observable<Movie[]>;
  slides$: Observable<Slide[]>;

  constructor(protected cinema: CinemaService, protected offline: Offline) { }

  ngOnInit() {

    this.movies$ = this.cinema.getMovies().pipe(this.offline.catch());

    this.slides$ = this.cinema.getSlides().pipe(this.offline.catch());

  }

}
