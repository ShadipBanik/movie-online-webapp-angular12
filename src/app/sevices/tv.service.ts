import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { tv, TvCredits, tvDto, TvImages, TvVideosDto } from '../models/tv';
import { GenresDto } from '../models/genres';
@Injectable({
  providedIn: 'root'
})
export class TvService {
  host: string = environment.host;
  api_key: string = 'api_key=' + environment.host_api_key;
  constructor(private httpclient: HttpClient) {}
  getTvShows(type: string = 'popular', count: number = 12) {
    return this.httpclient.get<tvDto>(`${this.host}tv/${type + '?' + this.api_key}`).pipe(
      switchMap((res) => {
        return of(res.results.filter((x) => x.backdrop_path != null).slice(0, count));
      })
    );
  }
  getTvshow(id: string) {
    return this.httpclient.get<tv>(this.host + 'tv/' + id + '?' + this.api_key);
  }
  searchTvShows(page: number, type: string, searchValue?: string) {
    let uri = searchValue ? 'search/tv' : `tv/${type}`;
    return this.httpclient
      .get<tvDto>(this.host + `${uri}?page=${page}&query=${searchValue}&` + this.api_key)
      .pipe(
        switchMap((res) => {
          let results = res.results.filter((x) => x.backdrop_path != null);
          res.results = results;
          return of(res);
        })
      );
  }
  getTvShowVideos(id: string) {
    return this.httpclient
      .get<TvVideosDto>(this.host + 'tv/' + id + '/videos?' + this.api_key)
      .pipe(
        switchMap((res) => {
          return of(res.results.slice(0, 3));
        })
      );
  }
  getTvGenres() {
    return this.httpclient.get<GenresDto>(this.host + 'genre/tv/list?' + this.api_key).pipe(
      switchMap((res) => {
        return of(res.genres);
      })
    );
  }
  getTvsByGenre(genreId: number, page: number) {
    return this.httpclient
      .get<tvDto>(this.host + `discover/tv?with_genres=${genreId}&page=${page}&` + this.api_key)
      .pipe(
        switchMap((res) => {
          return of(res);
        })
      );
  }

  getTvImages(id: string) {
    return this.httpclient.get<TvImages>(this.host + 'tv/' + id + '/images?' + this.api_key);
  }
  getTvCredits(id: string) {
    return this.httpclient.get<TvCredits>(this.host + 'tv/' + id + '/credits?' + this.api_key);
  }
}
