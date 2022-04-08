import { Movie } from './movies';

export interface tv extends Movie {
  name: string;
}
export interface tvDto {
  page: number;
  results: Movie[];
  total_results: number;
  total_pages: number;
}
export interface TvVideosDto {
  id: number;
  results: TvVideo[];
}

export interface TvVideo {
  site: string;
  key: string;
}
export interface TvImages {
  backdrops: {
    file_path: string;
  }[];
}
export interface TvCredits {
  cast: {
    name: string;
    profile_path: string;
  }[];
}
