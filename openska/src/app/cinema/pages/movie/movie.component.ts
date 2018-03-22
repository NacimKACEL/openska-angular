import { Component, OnInit } from '@angular/core';
import { Movie } from '../../shared/movie';
import { CinemaService } from '../../shared/cinema.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'openska-movie',
  template: `
    <openska-movie-details *ngIf="movie" [movie]="movie"><openska-movie-details>
  `,
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Movie;
  constructor(protected cinemaService: CinemaService, protected route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || '1');

    this.cinemaService.getMovie(id).subscribe((result) => {
      this.movie = result;
    }, () => {});
  }

}
