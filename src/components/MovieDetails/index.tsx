import { useEffect, useState } from "react";
import movieService from "../../services/movie";
import {
  MovieDetails as MovieDetailsType,
  MoviePreview as MoviePreviewType,
} from "../../types";
import {
  mapServerMovieDetailsToMovieDetails,
  mapServerMovieToMovie,
} from "../../mappers";
import MoviePreview from "../MoviePreview";

interface MovieDetailsProps {
  id: number;
}

function MovieDetails({ id }: MovieDetailsProps) {
  const [movie, setMovie] = useState<
    (MovieDetailsType & { recommendations: MoviePreviewType[] }) | null
  >(null);

  useEffect(() => {
    Promise.all([
      movieService.getMovieById(id),
      movieService.getMovieRecommendations(id),
    ])
      .then((response) => {
        return {
          ...mapServerMovieDetailsToMovieDetails(response[0]),
          recommendations: response[1].results.map(mapServerMovieToMovie),
        };
      })
      .then((movie) => {
        setMovie(movie);
      });
  }, [id]);

  if (!movie) {
    return;
  }

  return (
    <article>
      <h1>{movie.title}</h1>
      <p>{movie.overview}</p>
      <p>Жанр: {movie.genres}</p>
      <p>Бюджет: ${movie.budget}</p>
      <p>Выручка: ${movie.revenue}</p>
      <p>Дата релиза: {movie.releaseDate}</p>
      <p>Продолжительность: {movie.runtime} минуты</p>
      <p>
        {movie.voteAverage} / {movie.voteCount}
      </p>
      <img src={movie.posterUrl} alt={`Постер для фильма ${movie.title}`} />
      <ul>
        <h2>Похожие фильмы</h2>
        <ul>
          {movie.recommendations.map((recommendation) => (
            <li key={recommendation.id}>
              <MoviePreview movie={recommendation} />
            </li>
          ))}
        </ul>
      </ul>
    </article>
  );
}

export default MovieDetails;
