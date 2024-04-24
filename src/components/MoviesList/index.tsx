import { useEffect, useState } from "react";
import { MoviePreview as MoviePreviewType } from "../../types";
import movieService from "../../services/movie";
import { mapServerMovieToMovie } from "../../mappers";
import MoviePreview from "../MoviePreview";

function MoviesList() {
  const [movies, setMovies] = useState<MoviePreviewType[] | null>(null);

  useEffect(() => {
    movieService
      .getTopMovies(1)
      .then((response) => response.results.map(mapServerMovieToMovie))
      .then((movies) => setMovies(movies));
  }, []);

  if (!movies) {
    return;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <MoviePreview movie={movie} />
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
