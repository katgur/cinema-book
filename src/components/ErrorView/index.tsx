import style from "./style.module.scss";

interface ErrorViewProps {
  title: string;
  message: string;
}

function ErrorView({ title, message }: ErrorViewProps) {
  return (
    <div className={style.container}>
      <article className={style.content}>
        <h1 className={style.title}>{title}</h1>
        <p>{message}</p>
      </article>
    </div>
  );
}

export default ErrorView;
