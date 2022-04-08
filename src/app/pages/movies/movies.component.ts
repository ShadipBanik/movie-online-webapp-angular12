import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import { take } from 'rxjs/operators';
import { Movie } from 'src/app/models/movies';
import { MoviesService } from 'src/app/sevices/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  @ViewChild('p', { static: false }) paginator!: Paginator;
  movies: Movie[] = [];
  first: number = 0;
  items: MenuItem[] = [];
  movieType: string = 'popular';
  genreId: number | null = null;
  totalRecords: number | null = null;
  searchText: string | null = null;
  constructor(private movieservice: MoviesService, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe(({ genreId }) => {
      if (genreId) {
        this.genreId = genreId;
        this.getMoviesByGenre(genreId, 1);
      } else {
        this.getAllMovies(1, this.movieType);
      }
    });
    this.items = [
      {
        label: 'Popular',
        command: () => {
          this.movieType = 'popular';
          this.searchText = null;
          this.paginator.changePageToFirst(event);
          this.getAllMovies(1, 'popular');
        }
      },
      {
        label: 'Top Rated',
        command: () => {
          this.movieType = 'top_rated';
          this.searchText = null;
          this.paginator.changePageToFirst(event);
          this.getAllMovies(1, 'top_rated');
        }
      },
      {
        label: 'Upcoming',
        command: () => {
          this.movieType = 'upcoming';
          this.searchText = null;
          this.paginator.changePageToFirst(event);
          this.getAllMovies(1, 'upcoming');
        }
      }
    ];
  }
  getAllMovies(page: number, type: string, searchvalue?: string) {
    this.movieservice.searchMovies(page, type, searchvalue).subscribe((res) => {
      this.totalRecords = res.total_results;
      this.movies = res.results;
    });
  }
  pagenate(event: any) {
    const pageNumber = event.page + 1;
    if (this.genreId) {
      this.getMoviesByGenre(this.genreId, pageNumber);
    } else {
      if (this.searchText) {
        this.getAllMovies(pageNumber, this.movieType, this.searchText);
      } else {
        this.getAllMovies(pageNumber, this.movieType);
      }
    }
  }
  getMoviesByGenre(genreId: number, page: number) {
    this.movieservice.getMoviesByGenre(genreId, page).subscribe((res) => {
      this.totalRecords = res.total_results;
      this.movies = res.results;
    });
  }
  searchKey(event: any) {
    this.paginator.changePageToFirst(event);
    this.searchText = event.target.value;
    this.getAllMovies(1, this.movieType, event.target.value);
  }
}
