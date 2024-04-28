import { Link } from "react-router-dom";
import { MoviePreview } from "../../types";
import style from "./style.module.scss";

interface MoviePreviewViewProps {
  movie: MoviePreview;
}

function MoviePreviewView({ movie }: MoviePreviewViewProps) {
  let ratingStyle;
  if (movie.voteAverage > (2 / 3) * 10) {
    ratingStyle = style.ratingGood;
  } else if (movie.voteAverage > (1 / 3) * 10) {
    ratingStyle = style.ratingAverage;
  } else {
    ratingStyle = style.ratingBad;
  }

  return (
    <article className={style.container}>
      <img
        className={style.image}
        src={movie.posterUrl}
        loading="lazy"
        alt={`Постер для фильма ${movie.title}`}
      />
      <div className={style.content}>
        <h1 className={style.title}>
          <Link to={`/${movie.id}`}>{movie.title}</Link>
        </h1>
        <p className={style.subtitle}>{movie.subtitle}</p>
        <p className={`${style.rating} ${ratingStyle}`}>
          {movie.voteAverage.toFixed(2)}
        </p>
      </div>
    </article>
  );
}

export default MoviePreviewView;
