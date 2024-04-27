import { Link } from "react-router-dom";
import { MoviePreview as MoviePreviewType } from "../../types";

interface MoviePreviewProps {
  movie: MoviePreviewType;
}

function MoviePreview({ movie }: MoviePreviewProps) {
  return (
    <>
      <h2>
        <Link to={`/${movie.id}`}>{movie.title}</Link>
      </h2>
      <p>{movie.releaseDate}</p>
      <img
        src={movie.posterUrl}
        loading="lazy"
        alt={`Постер для фильма ${movie.title}`}
      />
    </>
  );
}

export default MoviePreview;
