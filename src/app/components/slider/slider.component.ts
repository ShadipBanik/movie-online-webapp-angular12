import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movies';
import { IMAGE_SIZES } from '../../constants/image-size';
@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
  animations: [
    trigger('slideFade', [
      state('void', style({ opacity: 0 })),
      transition('void <=> *', [animate('1s')])
    ])
  ]
})
export class SliderComponent implements OnInit {
  @Input() items: Movie[] = [];
  @Input() isBanner: Boolean = false;
  readonly imageSizes = IMAGE_SIZES;
  currentSlideIndex: number = 0;

  ngOnInit(): void {
    if (!this.isBanner) {
      setInterval(() => {
        this.currentSlideIndex = ++this.currentSlideIndex % this.items.length;
      }, 5000);
    }
  }
}
