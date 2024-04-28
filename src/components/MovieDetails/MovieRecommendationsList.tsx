import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import movieService from "../../services/movie";
import PaginationView from "../PaginationView";
import MoviePreview from "../MoviePreview";
import { mapServerMovieToMovie } from "../../mappers";
import style from "./style.module.scss";

function MovieRecommendationsList({ id }: { id: string }) {
  const [page, setPage] = useState<number>(1);
  const { isPending, error, data } = useQuery({
    queryKey: ["recommendations", id, page],
    queryFn: () => movieService.getMovieRecommendations(id, page),
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

  return (
    <section className={style.recommendations}>
      <h2 className={style.titleSecondary}>Похожие фильмы</h2>
      <PaginationView
        page={data.page}
        totalPages={data.total_pages}
        onPageChanged={setPage}
      />
      <ul className={style.list}>
        {data.results.map((recommendation) => (
          <li key={recommendation.id} className={style.item}>
            <MoviePreview movie={mapServerMovieToMovie(recommendation)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MovieRecommendationsList;
