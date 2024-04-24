export type ServerMoviePreview = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
};

export type Genre = {
  id: number;
  name: string;
};

export type ServerMovieDetails = ServerMoviePreview & {
  overview: string;
  genres: Genre[];
  budget: number;
  revenue: number;
  runtime: number;
  vote_average: number;
  vote_count: number;
};

export interface Pagination {
  page: number;
  total_pages: number;
  total_results: number;
}

export type GetTopMoviesResponse = Pagination & {
  results: ServerMoviePreview[];
};

export type GetMovieByIdResponse = ServerMovieDetails;

export type GetMovieRecommendationsResponse = Pagination & {
  results: ServerMoviePreview[];
};

export type MoviePreview = {
  id: number;
  posterUrl: string;
  releaseDate: string;
  title: string;
};

export type MovieDetails = MoviePreview & {
  overview: string;
  genres: string;
  budget: number;
  revenue: number;
  runtime: number;
  voteAverage: number;
  voteCount: number;
};
