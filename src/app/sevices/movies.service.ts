import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieDto } from '../models/movies';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
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
        return of(res.results.slice(0, count));
      })
    );
  }

  searchMovies(page: number) {
    return this.httpclient
      .get<MovieDto>(this.host + `movie/popular?page=${page}&` + this.api_key)
      .pipe(
        switchMap((res) => {
          return of(res.results);
        })
      );
  }
  getTvShows(type: string = 'latest', count: number = 12) {
    return this.httpclient.get<MovieDto>(`${this.host}tv/${type + '?' + this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results.slice(0, count));
      })
    );
  }
}
