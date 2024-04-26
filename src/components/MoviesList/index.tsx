import movieService from "../../services/movie";
import { mapServerMovieToMovie } from "../../mappers";
import MoviePreview from "../MoviePreview";
import { useQuery } from "@tanstack/react-query";

function MoviesList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["movies"],
    queryFn: () => movieService.getTopMovies(1),
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
    <ul>
      {data.results.map((movie) => (
        <li key={movie.id}>
          <MoviePreview movie={mapServerMovieToMovie(movie)} />
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
