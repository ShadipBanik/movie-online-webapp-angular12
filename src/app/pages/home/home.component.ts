import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/sevices/movies.service';
import { Movie } from 'src/app/models/movies';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popualarTvShows: Movie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.allMovies();
  }
  allMovies() {
    this.moviesService.getMovies('popular').subscribe((response) => {
      this.popularMovies = response;
    });
    this.moviesService.getMovies('upcoming').subscribe((response) => {
      this.upcomingMovies = response;
    });
    this.moviesService.getMovies('top_rated').subscribe((response) => {
      this.topRatedMovies = response;
    });
    this.moviesService.getTvShows('popular').subscribe((response) => {
      this.popualarTvShows = response;
    });
  }
}
