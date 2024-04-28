import movieService from "../../services/movie";
import { mapServerMovieDetailsToMovieDetails } from "../../mappers";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import MovieRecommendationsList from "./MovieRecommendationsList";
import style from "./style.module.scss";
import ErrorView from "../ErrorView";
import Spinner from "../Spinner";

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
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorView
        title="Не удалось загрузить информацию о фильме"
        message={error.message}
      />
    );
  }

  if (!data) {
    return;
  }

  const movieDetails = mapServerMovieDetailsToMovieDetails(data);

  return (
    <section className={style.container}>
      <div className={style.movieCard}>
        <div className={style.content}>
          <h2 className={style.title}>{movieDetails.title}</h2>
          <h3 className={style.subtitle}>{movieDetails.subtitle}</h3>
          <p className={style.text}>{movieDetails.overview}</p>
          <ul className={style.list}>
            <li>
              <span className={style.property}>Жанр: </span>
              {movieDetails.genres}
            </li>
            <li>
              <span className={style.property}>Дата выхода: </span> {movieDetails.releaseDate}
            </li>
            {movieDetails.budget && (
              <li>
                <span className={style.property}>Бюджет: </span> {movieDetails.budget}
              </li>
            )}
            {movieDetails.revenue && (
              <li>
                <span className={style.property}>Сборы: </span>
                {movieDetails.revenue}
              </li>
            )}
            <li>
              <span className={style.property}>Продолжительность: </span>
              {movieDetails.runtime}
            </li>
            <li>
              <span className={style.property}>Оценка: </span>
              {movieDetails.voteAverage}
            </li>
          </ul>
        </div>
        <img
          className={style.image}
          src={movieDetails.posterUrl}
          alt={`Постер для фильма ${movieDetails.title}`}
        />
      </div>
      {id && <MovieRecommendationsList id={id} />}
    </section>
  );
}

export default MovieDetailsView;
