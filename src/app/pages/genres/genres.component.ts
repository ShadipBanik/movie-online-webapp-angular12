import { Component, OnInit } from '@angular/core';
import { Genre } from 'src/app/models/genres';
import { MoviesService } from 'src/app/sevices/movies.service';
import { TvService } from 'src/app/sevices/tv.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  moviegenres: Genre[] = [];
  tvgenres: Genre[] = [];
  constructor(private movieservice: MoviesService, private tvservices: TvService) {}

  ngOnInit(): void {
    this.getGenres();
  }

  getGenres() {
    this.movieservice.getMovieGenres().subscribe((res) => {
      this.moviegenres = res;
    });
    this.tvservices.getTvGenres().subscribe((res) => {
      this.tvgenres = res;
    });
  }
}
