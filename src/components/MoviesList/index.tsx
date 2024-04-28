import movieService from "../../services/movie";
import { mapServerMovieToMovie } from "../../mappers";
import MoviePreview from "../MoviePreview";
import { useQuery } from "@tanstack/react-query";
import PaginationView from "../PaginationView";
import { useState } from "react";
import style from "./style.module.scss";
import Spinner from "../Spinner";

function MoviesList() {
  const [page, setPage] = useState<number>(1);
  const { isPending, error, data } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => movieService.getTopMovies(page),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data) {
    return;
  }

  return (
    <section className={style.container}>
      <h2 className={style.header}>Лучшие фильмы</h2>
      <div className={style.pagination}>
        <PaginationView
          page={data.page}
          totalPages={data.total_pages}
          onPageChanged={setPage}
        />
      </div>
      <ul className={style.list}>
        {data.results.map((movie) => (
          <li key={movie.id} className={style.item}>
            <MoviePreview movie={mapServerMovieToMovie(movie)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MoviesList;
