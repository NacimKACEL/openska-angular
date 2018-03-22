import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { HttpClient } from '@angular/common/http';
import { Theater } from './theater';

@Injectable()
export class CinemaService {
  movies: Movie[] = [
    {id: 1, title: 'Coco', imgSrc: 'static/images/movies/coco.jpg', summary: ''},
    {id: 2, title: 'Coco', imgSrc: 'static/images/movies/coco.jpg', summary: ''},
  ];
  constructor(protected http: HttpClient) { }

  getMovies() {
    return this.http.get<Movie[]>(`/api/movies`);
  }

  getMovie(id: number) {
    return this.http.get<Movie>(`/api/movies/${id}`);
  }

  getTheatres() {
    return this.http.get<Theater[]>(`/api/theaters`);
  }

  getTheater(id: number) {
    return this.http.get<Theater>(`/api/theaters/${id}`);
  }
}
