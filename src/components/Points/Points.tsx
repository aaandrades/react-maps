import { useMapContext } from "../../Context/context";
import PointDetails from "../PointDetails/PointDetails";
import { IPoint } from "../../Models/Interfaces";
import "./styles.scss";

const Points = ({ height }: any) => {
  const { maps, setMaps } = useMapContext();

  console.log(height.get());

  return (
    <div
      className="points-container"
      style={{ height: height.get() < 20 ? "0px" : height.get() }}
    >
      {maps.points.map((point: IPoint) => (
        <PointDetails key={point._id.$oid} point={point} />
      ))}
    </div>
  );
};

export default Points;
