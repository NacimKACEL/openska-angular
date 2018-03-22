import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../shared/movie';

@Component({
  selector: 'openska-movies-list',
  template: `
    <div *ngFor="let movie of movies">
      <img [src]="movie.imgSrc">
      <h2><a [routerLink]="movie.id"> {{movie.title}} </a></h2>
    </div>
  `,
  styleUrls: ['./movies-list.component.css']
})
export class MoviesListComponent implements OnInit {
  @Input() movies: Movie;

  constructor() { }

  ngOnInit() {
  }

}
