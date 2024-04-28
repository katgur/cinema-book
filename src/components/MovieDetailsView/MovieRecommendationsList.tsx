import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import movieService from "../../services/movie";
import PaginationView from "../PaginationView";
import MoviePreviewView from "../MoviePreviewView";
import { mapServerMovieToMovie } from "../../mappers";
import style from "./style.module.scss";
import Spinner from "../Spinner";
import ErrorView from "../ErrorView";

interface MovieRecommendationsListProps {
  id: string;
}

function MovieRecommendationsList({ id }: MovieRecommendationsListProps) {
  const [page, setPage] = useState<number>(1);
  const { isPending, error, data } = useQuery({
    queryKey: ["recommendations", id, page],
    queryFn: () => movieService.getMovieRecommendations(id, page),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <Spinner />;
  }

  if (error) {
    return (
      <ErrorView
        title="Не удалось загрузить список рекомендаций"
        message={error.message}
      />
    );
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
      <ul className={style.recommendationsList}>
        {data.results.map((recommendation) => (
          <li key={recommendation.id} className={style.item}>
            <MoviePreviewView movie={mapServerMovieToMovie(recommendation)} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MovieRecommendationsList;
