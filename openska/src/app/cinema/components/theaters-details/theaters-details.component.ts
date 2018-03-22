import { Component, OnInit, Input } from '@angular/core';
import { Theater } from '../../shared/theater';

@Component({
  selector: 'openska-theaters-details',
  template: `
  <img [src]="theater.logoSrc">
  <ul>
    <li><h1>{{theater.title}}</h1></li>
    <li><p>{{theater.address}}</p></li>
    <li><div *ngFor="let schedulesId of theater.schedulesIds">
      <ul>
        <li>{{schedulesId}}</li>
      </ul>
    </div></li>
  </ul>
  `,
  styleUrls: ['./theaters-details.component.css']
})
export class TheatersDetailsComponent implements OnInit {

  @Input() theater: Theater;

  constructor() { }

  ngOnInit() {
  }

}
