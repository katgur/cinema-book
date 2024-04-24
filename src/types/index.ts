export interface TopMoviesResponse {
  page: number;
  results: ServerMovie[];
  total_pages: number;
  total_results: number;
}

export interface ServerMovie {
  id: number;
  poster_path: string;
  release_date: string;
  title: string;
  vote_average: number;
  vote_count: number;
}

export interface Movie {
  id: number;
  posterUrl: string;
  releaseDate: string;
  title: string;
  voteAverage: number;
  voteCount: number;
}
