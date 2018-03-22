import { Component, OnInit } from '@angular/core';
import { CinemaService } from '../../shared/cinema.service';
import { Movie } from '../../shared/movie';

@Component({
  selector: 'openska-movies',
  template: `
    <openska-movies-list *ngIf="movies" [movies]="movies"></openska-movies-list>
  `,
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[];
  constructor(protected cinemaService: CinemaService) { }

  ngOnInit() {
    this.cinemaService.getMovies().subscribe((result) => {
      this.movies = result;
    }, () => {});
    // Gestion de l'erreur : catch
  }

}
