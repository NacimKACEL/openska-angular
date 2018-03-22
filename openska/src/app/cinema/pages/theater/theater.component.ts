import { Component, OnInit } from '@angular/core';
import { Theater } from '../../shared/theater';
import { CinemaService } from '../../shared/cinema.service';
import { Route, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'openska-theater',
  template: `
  <openska-theaters-details *ngIf="theater" [theater]="theater"><openska-theaters-details>
  `,
  styleUrls: ['./theater.component.css']
})
export class TheaterComponent implements OnInit {

  theater: Theater;

  constructor(protected cinemaService: CinemaService, protected route: ActivatedRoute) { }

  ngOnInit() {
    const id = Number.parseInt(this.route.snapshot.paramMap.get('id') || '1');

    this.cinemaService.getTheater(id).subscribe((result) => {
      this.theater = result;
    }, () => {});
  }

}
