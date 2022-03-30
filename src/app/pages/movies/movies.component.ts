import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movies';
import { MoviesService } from 'src/app/sevices/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  genreId: number | null = null;
  constructor(private movieservice: MoviesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getAllMovies(1);
      }
    });
  }
  getAllMovies(page: number) {
    this.movieservice.searchMovies(page).subscribe((res) => {
      this.movies = res;
    });
  }
  pagenate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      this.getAllMovies(pageNumber);
    }
  }
  getMoviesByGenre(genreId: number, page: number) {
    this.movieservice.getMoviesByGenre(genreId, page).subscribe((res) => {
      this.movies = res;
    });
  }
  searchKey(event: any) {
    console.log(event.target.value);
  }
}
