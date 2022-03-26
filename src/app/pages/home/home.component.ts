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
  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.allMovies();
  }
  allMovies() {
    this.moviesService.getMovies('popular').subscribe((response: any) => {
      this.popularMovies = response.results;
    });
    this.moviesService.getMovies('upcoming').subscribe((response: any) => {
      this.upcomingMovies = response.results;
    });
    this.moviesService.getMovies('top_rated').subscribe((response: any) => {
      this.topRatedMovies = response.results;
    });
  }
}
