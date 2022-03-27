import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/models/movies';
import { MoviesService } from 'src/app/sevices/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  movies: Movie[] = [];
  constructor(private movieservice: MoviesService) {}

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.movieservice.searchMovies(1).subscribe((res) => {
      this.movies = res;
    });
  }
}
