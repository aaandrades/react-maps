import { IPointDetails } from "../../Models/Interfaces";
import Button from "../Button/Button";
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
      <Button onClick={() => console.log("Open details")}>Details</Button>
    </div>
  );
};

export default PointDetails;
