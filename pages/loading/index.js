import style from "./../../styles/LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className={style.loadingio_spinner_double_ring_skvnrc1dpw}>
        <div className={style.ldio_xqw00oyri}>
          <div></div>
          <div></div>
          <div>
            <div></div>
          </div>
          <div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
