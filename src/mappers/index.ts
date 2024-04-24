import {
  MovieDetails,
  MoviePreview,
  ServerMovieDetails,
  ServerMoviePreview,
} from "../types";

export function mapServerMovieToMovie(
  serverMovie: ServerMoviePreview
): MoviePreview {
  return {
    id: serverMovie.id,
    posterUrl: mapPosterUrl(serverMovie.poster_path),
    releaseDate: serverMovie.release_date,
    title: serverMovie.title,
  };
}

export function mapServerMovieDetailsToMovieDetails(
  serverMovie: ServerMovieDetails
): MovieDetails {
  return {
    id: serverMovie.id,
    posterUrl: mapPosterUrl(serverMovie.poster_path),
    releaseDate: serverMovie.release_date,
    title: serverMovie.title,
    overview: serverMovie.overview,
    genres: serverMovie.genres.map((genre) => genre.name).join(", "),
    budget: serverMovie.budget,
    revenue: serverMovie.revenue,
    runtime: serverMovie.runtime,
    voteAverage: serverMovie.vote_average,
    voteCount: serverMovie.vote_count,
  };
}

function mapPosterUrl(posterPath: string): string {
  return `https://image.tmdb.org/t/p/w200${posterPath}`;
}
