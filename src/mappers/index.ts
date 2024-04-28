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
    title: serverMovie.title,
    subtitle: `${serverMovie.original_title}, ${serverMovie.release_date.split("-")[0]}`,
    voteAverage: serverMovie.vote_average,
  };
}

export function mapServerMovieDetailsToMovieDetails(
  serverMovie: ServerMovieDetails
): MovieDetails {
  return {
    id: serverMovie.id,
    posterUrl: mapPosterUrl(serverMovie.poster_path),
    title: serverMovie.title,
    subtitle: `${serverMovie.original_title}, ${serverMovie.release_date.split("-")[0]}`,
    originalTitle: serverMovie.original_title,
    releaseDate: serverMovie.release_date,
    voteAverage: serverMovie.vote_average,
    voteCount: serverMovie.vote_count,
    overview: serverMovie.overview,
    genres: serverMovie.genres.map((genre) => genre.name).join(", "),
    budget: serverMovie.budget,
    revenue: serverMovie.revenue,
    runtime: serverMovie.runtime,
  };
}

function mapPosterUrl(posterPath: string): string {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}
