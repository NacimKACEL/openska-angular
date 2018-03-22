import { Component } from '@angular/core';

@Component({
  selector: 'openska-root',
  template: `
  <hr>
  <nav> <a [routerLink]="['cinema/movies']">Movies</a> | <a [routerLink]="['cinema/theaters']">Theaters</a></nav>
  <hr>
    {{title}}
    <openska-slideshow delay="2000">
      <div><img src="static/images/movies/starwars.jpg" alt=""></div>
      <div><img src="static/images/movies/coco.jpg" alt=""></div>
      <div><img src="static/images/movies/spiderman.jpg" alt=""></div>
    </openska-slideshow>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'openska';

  constructor() {
    setTimeout(() => {
      this.title="dddddddd";
    }, 2000);
  }
}
