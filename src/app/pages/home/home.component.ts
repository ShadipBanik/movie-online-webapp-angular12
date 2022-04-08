import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/sevices/movies.service';
import { Movie } from 'src/app/models/movies';
import { TvService } from 'src/app/sevices/tv.service';
import { tv } from 'src/app/models/tv';
import { async } from '@angular/core/testing';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  sliderData: Movie[] = [];
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTvShows: tv[] = [];
  topRatedTvShows: tv[] = [];

  constructor(private moviesService: MoviesService, private tvService: TvService) {}

  ngOnInit(): void {
    this.allMoviesAndTvShows();
  }

  allMoviesAndTvShows() {
    this.moviesService.getMovies('popular').subscribe((response) => {
      this.popularMovies = response;
    });
    this.moviesService.getMovies('upcoming').subscribe((response) => {
      this.upcomingMovies = response;
      this.tvService.getTvShows('top_rated').subscribe((res) => {
        this.topRatedTvShows = res;
        const randomData: any = this.upcomingMovies.concat(this.topRatedTvShows);
        this.sliderData = this.getShuffledArr(randomData);
      });
    });
    this.moviesService.getMovies('top_rated').subscribe((response) => {
      this.topRatedMovies = response;
    });

    this.tvService.getTvShows('popular').subscribe((response) => {
      this.popularTvShows = response;
    });
  }
  getShuffledArr(arr: []) {
    const newArr = arr.slice();
    for (let i = newArr.length - 1; i > 0; i--) {
      const rand = Math.floor(Math.random() * arr.length);
      [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    }
    return newArr;
  }
}
