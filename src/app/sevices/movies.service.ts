import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Movie, MovieCredits, MovieDto, MovieImages, MovieVideosDto } from '../models/movies';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { GenresDto } from '../models/genres';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  host: string = environment.host;
  api_key: string = 'api_key=' + environment.host_api_key;
  constructor(private httpclient: HttpClient) {}

  getMovies(type: string = 'upcoming', count: number = 12) {
    return this.httpclient.get<MovieDto>(this.host + 'movie/' + type + '?' + this.api_key).pipe(
      switchMap((res) => {
        return of(res.results.filter((x) => x.backdrop_path != null).slice(0, count));
      })
    );
  }

  searchMovies(page: number, type: string = 'popular', searchvalue?: string) {
    let uri = searchvalue ? 'search/movie' : `movie/${type}`;
    return this.httpclient
      .get<MovieDto>(this.host + `${uri}?page=${page}&query=${searchvalue}&` + this.api_key)
      .pipe(
        switchMap((res) => {
          return of(res);
        })
      );
  }
  getMovie(id: string) {
    return this.httpclient.get<Movie>(this.host + 'movie/' + id + '?' + this.api_key);
  }

  getMovieVideos(id: string) {
    return this.httpclient
      .get<MovieVideosDto>(this.host + 'movie/' + id + '/videos?' + this.api_key)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 3));
        })
      );
  }
  getMovieGenres() {
    return this.httpclient.get<GenresDto>(this.host + 'genre/movie/list?' + this.api_key).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }
  getMoviesByGenre(genreId: number, page: number) {
    return this.httpclient
      .get<MovieDto>(
        this.host + `discover/movie?with_genres=${genreId}&page=${page}&` + this.api_key
      )
      .pipe(
        switchMap((res) => {
          return of(res);
        })
      );
  }

  getMovieImages(id: string) {
    return this.httpclient.get<MovieImages>(this.host + 'movie/' + id + '/images?' + this.api_key);
  }
  getMovieCredits(id: string) {
    return this.httpclient.get<MovieCredits>(
      this.host + 'movie/' + id + '/credits?' + this.api_key
    );
  }
}
