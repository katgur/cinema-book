import {
  ServerMoviePreview,
  GetMovieByIdResponse,
  Genre,
  GetTopMoviesResponse,
  GetMovieRecommendationsResponse,
} from ".";

function isString(unknownType: unknown): unknownType is string {
  return typeof unknownType === "string" || unknownType instanceof String;
}

function isNumber(unknownType: unknown): unknownType is number {
  return typeof unknownType === "number" || unknownType instanceof Number;
}

function isArray(unknownType: unknown): unknownType is Array<unknown> {
  return unknownType instanceof Array && Array.isArray(unknownType);
}

function isServerMovie(
  unknownType: unknown
): unknownType is ServerMoviePreview {
  const movie = unknownType as ServerMoviePreview;
  return (
    isNumber(movie.id) &&
    isString(movie.poster_path) &&
    isString(movie.release_date) &&
    isString(movie.title)
  );
}

function isServerMoviesArray(
  unknownType: unknown
): unknownType is ServerMoviePreview[] {
  return isArray(unknownType) && unknownType.every(isServerMovie);
}

export function isGetTopMoviesResponse(
  unknownType: unknown
): unknownType is GetTopMoviesResponse {
  const response = unknownType as GetTopMoviesResponse;
  return (
    isNumber(response.page) &&
    isNumber(response.total_pages) &&
    isNumber(response.total_results) &&
    isServerMoviesArray(response.results)
  );
}

export function isGetMovieRecommendationsResponse(
  unknownType: unknown
): unknownType is GetMovieRecommendationsResponse {
  const response = unknownType as GetMovieRecommendationsResponse;
  return (
    isNumber(response.page) &&
    isNumber(response.total_pages) &&
    isNumber(response.total_results) &&
    isServerMoviesArray(response.results)
  );
}

function isGenre(unknownType: unknown): unknownType is Genre {
  const genre = unknownType as Genre;
  return isNumber(genre.id) && isString(genre.name);
}

function isGenresArray(unknownType: unknown): unknownType is Genre[] {
  return isArray(unknownType) && unknownType.every(isGenre);
}

export function isGetMovieByIdResponse(
  unknownType: unknown
): unknownType is GetMovieByIdResponse {
  const response = unknownType as GetMovieByIdResponse;
  return (
    isNumber(response.budget) &&
    isNumber(response.id) &&
    isGenresArray(response.genres) &&
    isString(response.overview) &&
    isString(response.poster_path) &&
    isString(response.release_date) &&
    isString(response.title) &&
    isNumber(response.revenue) &&
    isNumber(response.runtime) &&
    isNumber(response.vote_average)
  );
}
