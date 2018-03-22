import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CinemaRoutingModule } from './cinema-routing.module';
import { MoviesComponent } from './pages/movies/movies.component';
import { CinemaService } from './shared/cinema.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { MovieComponent } from './pages/movie/movie.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { TheatersComponent } from './pages/theaters/theaters.component';
import { TheatersListComponent } from './components/theaters-list/theaters-list.component';
import { TheatersDetailsComponent } from './components/theaters-details/theaters-details.component';
import { TheaterComponent } from './pages/theater/theater.component';

@NgModule({
  imports: [
    CommonModule,
    CinemaRoutingModule
  ],
  declarations: [MoviesComponent, MoviesListComponent, MovieComponent, MovieDetailsComponent, TheatersComponent, TheatersListComponent, TheatersDetailsComponent, TheaterComponent],
  exports: [MoviesComponent],
  providers: [CinemaService]
})
export class CinemaModule { }
