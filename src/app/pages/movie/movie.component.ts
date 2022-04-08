import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieCredits, MovieImages, MovieVideo } from 'src/app/models/movies';
import { MoviesService } from 'src/app/sevices/movies.service';
import { IMAGE_SIZES } from 'src/app/constants/image-size';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit, OnDestroy {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  movieImages: MovieImages | null = null;
  movieCredits: MovieCredits | null = null;
  imageSizes = IMAGE_SIZES;
  responsiveOptions: any[] = [];
  constructor(private route: ActivatedRoute, private movieService: MoviesService) {}
  ngOnInit(): void {
    this.responsiceCarousel();
    this.route.params.pipe(first()).subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
      this.getMovieImages(id);
      this.getMovieCredits(id);
    });
  }

  ngOnDestroy() {
    console.log('component destroyed');
  }
  getMovie(id: string) {
    this.movieService.getMovie(id).subscribe((res) => {
      this.movie = res;
    });
  }
  getMovieVideos(id: string) {
    this.movieService.getMovieVideos(id).subscribe((res) => {
      this.movieVideos = res;
    });
  }
  getMovieImages(id: string) {
    this.movieService.getMovieImages(id).subscribe((res) => {
      this.movieImages = res;
    });
  }
  getMovieCredits(id: string) {
    this.movieService.getMovieCredits(id).subscribe((res) => {
      let data: any = res.cast.filter((x) => x.profile_path != null);
      this.movieCredits = { cast: data };
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
