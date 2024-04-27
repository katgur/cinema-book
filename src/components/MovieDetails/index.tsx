import movieService from "../../services/movie";
import { mapServerMovieDetailsToMovieDetails } from "../../mappers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import MovieRecommendationsList from "./MovieRecommendationsList";

function MovieDetails() {
  const { id } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["movie", id],
    queryFn: () => {
      if (!id) {
        throw new Error("Wrong movie id");
      }
      return movieService.getMovieById(id);
    },
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

  const movieDetails = mapServerMovieDetailsToMovieDetails(data);

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
      {id && <MovieRecommendationsList id={id} />}
    </article>
  );
}

export default MovieDetails;
