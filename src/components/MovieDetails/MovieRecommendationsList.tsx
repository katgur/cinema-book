import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import movieService from "../../services/movie";
import PaginationView from "../PaginationView";
import MoviePreview from "../MoviePreview";
import { mapServerMovieToMovie } from "../../mappers";

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
    <article>
      <h1>Похожие фильмы</h1>
      <PaginationView
        page={data.page}
        totalPages={data.total_pages}
        onPageChanged={setPage}
      />
      <ul>
        {data.results.map((recommendation) => (
          <li key={recommendation.id}>
            <MoviePreview movie={mapServerMovieToMovie(recommendation)} />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default MovieRecommendationsList;
