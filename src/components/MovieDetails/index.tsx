import movieService from "../../services/movie";
import {
  mapServerMovieDetailsToMovieDetails,
  mapServerMovieToMovie,
} from "../../mappers";
import MoviePreview from "../MoviePreview";
import { useQuery } from "@tanstack/react-query";

interface MovieDetailsProps {
  id: number;
}

function MovieDetails({ id }: MovieDetailsProps) {
  const { isPending, error, data } = useQuery({
    queryKey: ["movie"],
    queryFn: () =>
      Promise.all([
        movieService.getMovieById(id),
        movieService.getMovieRecommendations(id),
      ]),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return;
  }

  const [serverMovieDetails, recommendations] = data;

  const movieDetails = mapServerMovieDetailsToMovieDetails(serverMovieDetails);

  return (
    <article>
      <h1>{movieDetails.title}</h1>
      <p>{movieDetails.overview}</p>
      <p>Жанр: {movieDetails.genres}</p>
      <p>Бюджет: ${movieDetails.budget}</p>
      <p>Выручка: ${movieDetails.revenue}</p>
      <p>Дата релиза: {movieDetails.releaseDate}</p>
      <p>Продолжительность: {movieDetails.runtime} минуты</p>
      <p>
        {movieDetails.voteAverage} / {movieDetails.voteCount}
      </p>
      <img
        src={movieDetails.posterUrl}
        alt={`Постер для фильма ${movieDetails.title}`}
      />
      <ul>
        <h2>Похожие фильмы</h2>
        <ul>
          {recommendations.results.map((recommendation) => (
            <li key={recommendation.id}>
              <MoviePreview movie={mapServerMovieToMovie(recommendation)} />
            </li>
          ))}
        </ul>
      </ul>
    </article>
  );
}

export default MovieDetails;
