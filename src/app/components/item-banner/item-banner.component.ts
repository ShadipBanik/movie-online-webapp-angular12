import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movies';

@Component({
  selector: 'app-item-banner',
  templateUrl: './item-banner.component.html',
  styleUrls: ['./item-banner.component.css']
})
export class ItemBannerComponent {
  @Input() items: Movie[] = [];
  @Input() title: string = '';
}
