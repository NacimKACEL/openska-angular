import { Component, OnInit, Input } from '@angular/core';
import { Movie } from '../../shared/movie';

@Component({
  selector: 'openska-movie-details',
  template: `
    <h1>{{movie.title}}</h1>
    <p>{{movie.summary}}</p>
  `,
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  @Input() movie: Movie;

  constructor() { }

  ngOnInit() {
  }

}
