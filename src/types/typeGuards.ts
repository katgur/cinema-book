import { ServerMovie, TopMoviesResponse } from ".";

function isString(unknownType: unknown): unknownType is string {
  return typeof unknownType === "string" || unknownType instanceof String;
}

function isNumber(unknownType: unknown): unknownType is number {
  return typeof unknownType === "number" || unknownType instanceof Number;
}

function isArray(unknownType: unknown): unknownType is Array<unknown> {
  return unknownType instanceof Array && Array.isArray(unknownType);
}

function isServerMovie(unknownType: unknown): unknownType is ServerMovie {
  const movie = unknownType as ServerMovie;
  return (
    isNumber(movie.id) &&
    isString(movie.poster_path) &&
    isString(movie.release_date) &&
    isString(movie.title) &&
    isNumber(movie.vote_average) &&
    isNumber(movie.vote_count)
  );
}

function isServerMoviesArray(
  unknownType: unknown
): unknownType is ServerMovie[] {
  return isArray(unknownType) && unknownType.every(isServerMovie);
}

export function isTopMoviesResponse(
  unknownType: unknown
): unknownType is TopMoviesResponse {
  const response = unknownType as TopMoviesResponse;
  return (
    isNumber(response.page) &&
    isNumber(response.total_pages) &&
    isNumber(response.total_results) &&
    isServerMoviesArray(response.results)
  );
}
