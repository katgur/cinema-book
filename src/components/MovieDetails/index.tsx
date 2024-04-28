import movieService from "../../services/movie";
import { mapServerMovieDetailsToMovieDetails } from "../../mappers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import MovieRecommendationsList from "./MovieRecommendationsList";
import style from "./style.module.scss";

function MovieDetailsView() {
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
    return <li>Loading...</li>;
  }

  if (error) {
    return <li>{error.message}</li>;
  }

  if (!data) {
    return;
  }

  const movieDetails = mapServerMovieDetailsToMovieDetails(data);

  // const movieDetails: MovieDetails = {
  //   title: "Title",
  //   subtitle: "Original Title, 2020",
  //   releaseDate: "2020-13-02",
  //   overview: "Overview",
  //   genres: "Genres",
  //   budget: 123,
  //   runtime: 234,
  //   voteAverage: 8.5,
  //   voteCount: 1443,
  // };

  return (
    <section className={style.container}>
      <article className={style.movieCard}>
        <div className={style.content}>
          <h1 className={style.title}>{movieDetails.title}</h1>
          <h2 className={style.subtitle}>{movieDetails.subtitle}</h2>
          <p className={style.text}>{movieDetails.overview}</p>
          <ul className={style.list}>
            <li>Жанр: {movieDetails.genres}</li>
            <li>Бюджет: ${movieDetails.budget}</li>
            <li>Выручка: ${movieDetails.revenue}</li>
            <li>Дата релиза: {movieDetails.releaseDate}</li>
            <li>Продолжительность: {movieDetails.runtime} минуты</li>
            <li>Рейтинг: {movieDetails.voteAverage}</li>
          </ul>
        </div>
        <img
          className={style.image}
          src={movieDetails.posterUrl}
          alt={`Постер для фильма ${movieDetails.title}`}
        />
      </article>
      {id && <MovieRecommendationsList id={id} />}
    </section>
  );
}

export default MovieDetailsView;
