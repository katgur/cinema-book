import { useEffect, useState } from "react";
import { Movie } from "../../types";
import movieService from "../../services/movie";
import { mapServerMovieToMovie } from "../../mappers";

function MoviesList() {
  const [movies, setMovies] = useState<Movie[] | null>(null);

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
          <h2>{movie.title}</h2>
          <p>{movie.releaseDate}</p>
          <p>
            {movie.voteAverage} / {movie.voteCount}
          </p>
          <img
            src={movie.posterUrl}
            loading="lazy"
            alt={`Постер для фильма ${movie.title}`}
          />
        </li>
      ))}
    </ul>
  );
}

export default MoviesList;
