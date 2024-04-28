import { createPortal } from "react-dom";
import style from "./style.module.scss";

function ErrorView({ message }: { message: string }) {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Element with id 'root' is not defined");
  }
  return createPortal(
    <div className={style.container}>
      <article className={style.content}>
        <h1 className={style.title}>Произошла ошибка</h1>
        <p>{message}</p>
      </article>
    </div>,
    root
  );
}

export default ErrorView;
