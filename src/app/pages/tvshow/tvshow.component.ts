import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { IMAGE_SIZES } from 'src/app/constants/image-size';
import { tv, TvCredits, TvImages, TvVideo } from 'src/app/models/tv';
import { TvService } from 'src/app/sevices/tv.service';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.css']
})
export class TvshowComponent implements OnInit {
  tv: tv | null = null;
  tvVideos: TvVideo[] = [];
  tvImages: TvImages | null = null;
  tvCredits: TvCredits | null = null;
  responsiveOptions: any[] = [];
  imageSizes = IMAGE_SIZES;
  constructor(private route: ActivatedRoute, private tvService: TvService) {}
  ngOnInit(): void {
    this.responsiceCarousel();
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getTvShow(id);
      this.getTvShowVideos(id);
      this.getTvImages(id);
      this.getTvCredits(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }
  getTvShow(id: string) {
    this.tvService.getTvshow(id).subscribe((res) => {
      this.tv = res;
    });
  }
  getTvShowVideos(id: string) {
    this.tvService.getTvShowVideos(id).subscribe((res) => {
      this.tvVideos = res;
    });
  }
  getTvImages(id: string) {
    this.tvService.getTvImages(id).subscribe((res) => {
      this.tvImages = res;
    });
  }
  getTvCredits(id: string) {
    this.tvService.getTvCredits(id).subscribe((res) => {
      let data = res.cast.filter((x) => x.profile_path != null);
      this.tvCredits = { cast: data };
    });
  }
  responsiceCarousel() {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }
}
