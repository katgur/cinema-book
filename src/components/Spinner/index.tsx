import { createPortal } from "react-dom";
import style from "./style.module.scss";

function Spinner() {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Element with id 'root' is not defined");
  }
  return createPortal(
    <div className={style.container}>
      <div className={style.spinner}></div>
    </div>,
    root
  );
}

export default Spinner;
