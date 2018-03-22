import { Component, OnInit } from '@angular/core';
import { Theater } from '../../shared/theater';
import { CinemaService } from '../../shared/cinema.service';

@Component({
  selector: 'openska-theaters',
  template: `
    <openska-theaters-list *ngIf="theaters" [theaters]="theaters"></openska-theaters-list>
  `,
  styleUrls: ['./theaters.component.css']
})
export class TheatersComponent implements OnInit {

  theaters: Theater[];

  constructor(protected cinemaService: CinemaService) { }

  ngOnInit() {
    this.cinemaService.getTheatres().subscribe((result) => {
      this.theaters = result;
    }, () => {});
    // Gestion de l'erreur : catch
  }
}
