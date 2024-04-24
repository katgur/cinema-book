import { Movie, ServerMovie } from "../types";

export function mapServerMovieToMovie(serverMovie: ServerMovie): Movie {
  return {
    id: serverMovie.id,
    posterUrl: `https://image.tmdb.org/t/p/w200${serverMovie.poster_path}`,
    releaseDate: serverMovie.release_date,
    title: serverMovie.title,
    voteAverage: serverMovie.vote_average,
    voteCount: serverMovie.vote_count,
  };
}
