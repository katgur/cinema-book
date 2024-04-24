import { MoviePreview as MoviePreviewType } from "../../types";

interface MoviePreviewProps {
  movie: MoviePreviewType;
}

function MoviePreview({ movie }: MoviePreviewProps) {
  return (
    <>
      <h2>{movie.title}</h2>
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
