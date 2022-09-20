import DrawIcon from "../../assets/icons/draw";
import EraseIcon from "../../assets/icons/erase";
import RestartIcon from "../../assets/icons/restart";
import SearchIcon from "../../assets/icons/search";
import StopIcon from "../../assets/icons/stop";
import "../Map/styles.scss";

const PolygonActions = ({
  drawPolygon,
  setDrawPolygon,
  deleteLastPoint,
  restartPolygon,
  evaluatePoints,
}: any) => {
  console.log("DRAW: ", drawPolygon);
  return (
    <section className="map-container__draw">
      <button
        className="map-container__button pointer"
        onClick={() => setDrawPolygon(!drawPolygon)}
      >
        {drawPolygon ? (
          <>
            <StopIcon color="#0082c9" /> Stop
          </>
        ) : (
          <>
            <DrawIcon color="#0082c9" /> Draw
          </>
        )}
      </button>
      <button
        className="map-container__button pointer"
        onClick={() => deleteLastPoint()}
      >
        <EraseIcon color="#0082c9" />
        Delete
      </button>
      <button
        className="map-container__button pointer"
        onClick={() => restartPolygon()}
      >
        <RestartIcon color="#0082c9" />
        Restart
      </button>
      <button
        className="map-container__button pointer"
        onClick={() => evaluatePoints()}
      >
        <SearchIcon color="#0082c9" />
        Search
      </button>
    </section>
  );
};

export default PolygonActions;
