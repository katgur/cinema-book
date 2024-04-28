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
    subtitle: mapSubtitle(serverMovie.original_title, serverMovie.release_date),
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
    subtitle: mapSubtitle(serverMovie.original_title, serverMovie.release_date),
    releaseDate: mapDateToLocaleString(serverMovie.release_date),
    voteAverage: serverMovie.vote_average,
    overview: serverMovie.overview,
    genres: serverMovie.genres.map((genre) => genre.name).join(", "),
    budget: serverMovie.budget ? `$${serverMovie.budget}` : null,
    revenue: serverMovie.revenue ? `$${serverMovie.revenue}` : null,
    runtime: `${serverMovie.runtime} мин`,
  };
}

function mapSubtitle(originalTitle: string, releaseDate: string): string {
  return `${originalTitle}, ${releaseDate.split("-")[0]}`;
}

function mapPosterUrl(posterPath: string): string {
  return `https://image.tmdb.org/t/p/w500${posterPath}`;
}

function mapDateToLocaleString(date: string): string {
  return new Date(date).toLocaleDateString("ru", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
