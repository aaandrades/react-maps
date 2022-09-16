import { IPointDetails } from "../../Models/Interfaces";
import "./styles.scss";

const PointDetails = ({ point }: IPointDetails) => {
  return (
    <div className="point-details-container">
      <h4 className="point-details-container__name">{point.name}</h4>
      <p
        className="point-details-container__description"
        title={point.description}
      >
        {point.description}
      </p>
    </div>
  );
};

export default PointDetails;
