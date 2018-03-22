import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { Movie } from './movie';
import { Theater } from './theater';
import { Schedule } from './schedule';
import { Slide } from './slide';
import { Slide as SlideshowSlide } from '../../ui/slideshow';

@Injectable()
export class CinemaService {

  constructor(protected http: HttpClient) {}

  getMovies() {

    return this.http.get<Movie[]>(`/api/movies`);

  }

  getMovie(id: number) {

    return this.http.get<Movie>(`/api/movies/${id}`);

  }

  getTheaters() {

    return this.http.get<Theater[]>(`/api/theaters`);

  }

  getTheater(id: number) {

    return this.http.get<Theater>(`/api/theaters/${id}`);

  }

  getSlides(): Observable<SlideshowSlide[]> {

    return this.http.get<Slide[]>(`/api/slides`).pipe(
      map((slides) => slides.map((slide) => {
        return {
          id: slide.id,
          link: `/cinema/movies/${slide.movieId}`,
          imgSrc: slide.imgSrc,
          imgSrcFull: slide.imgSrcFull,
          imgAlt: slide.imgAlt,
        };
      }))
    );

  }

  groupMovieSchedules(schedules: Schedule[]) {

    return this.groupSchedules(schedules, 'theater');

  }

  groupTheaterSchedules(schedules: Schedule[]) {

    return this.groupSchedules(schedules, 'movie');

  }

  protected groupSchedules(schedules: Schedule[], groupBy: 'movie' | 'theater') {

    return Array.from(new Set<number>(schedules.map((schedule) => schedule[groupBy].id)))
    .map((id) => schedules.filter((schedule) => schedule[groupBy].id === id));

  }

}
