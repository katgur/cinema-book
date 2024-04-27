import movieService from "../../services/movie";
import { mapServerMovieToMovie } from "../../mappers";
import MoviePreview from "../MoviePreview";
import { useQuery } from "@tanstack/react-query";
import PaginationView from "../PaginationView";
import { useState } from "react";

function MoviesList() {
  const [page, setPage] = useState<number>(1);
  const { isPending, error, data } = useQuery({
    queryKey: ["movies", page],
    queryFn: () => movieService.getTopMovies(page),
    retry: false,
    refetchOnWindowFocus: false,
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!data || !data.results) {
    return;
  }

  return (
    <article>
      <h1>Лучшие фильмы</h1>
      <PaginationView
        page={data.page}
        totalPages={data.total_pages}
        onPageChanged={setPage}
      />
      <ul>
        {data.results.map((movie) => (
          <li key={movie.id}>
            <MoviePreview movie={mapServerMovieToMovie(movie)} />
          </li>
        ))}
      </ul>
    </article>
  );
}

export default MoviesList;
