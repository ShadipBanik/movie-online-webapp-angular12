import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genres';
import { MoviesService } from 'src/app/sevices/movies.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[] = [];
  constructor(private movieservice: MoviesService) {}

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.movieservice.getMovieGenres().subscribe((res) => {
      this.genres = res;
    });
  }
}
