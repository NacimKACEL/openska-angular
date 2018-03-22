import { Component, OnInit, Input, transition, ContentChildren, AfterContentInit, QueryList } from '@angular/core';
import { Transform } from 'stream';
import { SlideComponent } from '../slide/slide.component';

@Component({
  selector: 'openska-slideshow',
  template: `
    <div id="slideshow">
      <div id="slides" [style.transform]="transform" [style.transitionDuration.ms]="speed"
      (transitionend)="start()">
      <ng-content></ng-content>
      </div>
      <openska-pagination [slides]="slides" (pagination)="onPaginationClick($event)"></openska-pagination>
    </div>
  `,
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterContentInit {

  @Input() delay = 5000;
  @Input() speed = 1000;
  total = 0;
  current = 1;
  timer = 0;
  transform = '';

  @ContentChildren(SlideComponent) slides: QueryList<SlideComponent>;


  constructor() { }

  ngOnInit() {}

  ngAfterContentInit() {
    this.total = this.slides.length;

    this.start();
  }

  start() {

    window.setTimeout( () => {
      this.move();
    }, this.delay);

  }

  stop() {

    window.clearTimeout(this.timer);

  }

  move(next = (this.current < this.total) ? (this.current + 1) : 1) {
    this.transform = `translateX(${(1 - next) * 100}%)`;

    // est-ce que vous voulez poursuivre tout suite ou attendre la fin de l'instruction precedente ?
    // problemeatique java script


    this.current = next;

    //this.start();
  }

  onPaginationClick(page: number) {
    this.stop();

    this.move(page);
  }

}
