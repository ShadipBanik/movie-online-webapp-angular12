import { Component, Input, OnInit } from '@angular/core';
import { Movie } from '../../models/movies';
import { IMAGE_SIZES } from '../../constants/image-size';
@Component({
  selector: 'item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  @Input() itemData: Movie | null = null;
  imageSizes = IMAGE_SIZES;
  constructor() {}

  ngOnInit(): void {}
}
