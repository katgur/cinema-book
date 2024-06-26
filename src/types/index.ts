export type ServerMoviePreview = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  original_title: string;
  vote_average: number;
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
};

interface Pagination {
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
  title: string;
  subtitle: string;
  voteAverage: number;
};

export type MovieDetails = MoviePreview & {
  releaseDate: string;
  overview: string;
  genres: string;
  budget: string | null;
  revenue: string | null;
  runtime: string;
};
