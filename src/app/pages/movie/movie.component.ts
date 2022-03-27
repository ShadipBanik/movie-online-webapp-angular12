import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie, MovieVideo } from 'src/app/models/movies';
import { MoviesService } from 'src/app/sevices/movies.service';
import { IMAGE_SIZES } from 'src/app/components/image-size';
@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie: Movie | null = null;
  movieVideos: MovieVideo[] = [];
  imageSizes = IMAGE_SIZES;
  constructor(private route: ActivatedRoute, private movieService: MoviesService) {}
  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getMovie(id);
      this.getMovieVideos(id);
    });
  }

  getMovie(id: string) {
    this.movieService.getMovie(id).subscribe((res) => {
      this.movie = res;
      console.log(this.movie);
    });
  }
  getMovieVideos(id: string) {
    this.movieService.getMovieVideos(id).subscribe((res) => {
      this.movieVideos = res;
    });
  }
}
