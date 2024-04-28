import style from "./style.module.scss";

function Spinner() {
  return (
    <div className={style.container}>
      <div className={style.spinner}></div>
    </div>
  );
}

export default Spinner;
