import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  host: string = environment.host;
  api_key: string = '?api_key=' + environment.host_api_key;
  constructor(private httpclient: HttpClient) {}

  getMovies(type: string = 'upcoming') {
    return this.httpclient.get(this.host + type + this.api_key);
  }
}
