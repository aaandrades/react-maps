import HelpIcon from "../../assets/icons/help";
import CreateSvg from "../../assets/svg/create";
import DirectionsSvg from "../../assets/svg/directions";
import LocationSvg from "../../assets/svg/location";
import PolygonSearchSvg from "../../assets/svg/polygon";

import "./styles.scss";
import {
  Context,
  Creation,
  Directions,
  Location,
  Polygon,
  DirectionsRoute,
  LocationMaintenance,
} from "../../providers/ModalProvider";
import { OptionsTypes } from "../../helpers/constants";
import { useMapContext } from "../../Context/context";
import { IOptions } from "../../Context/types";
import { useState } from "react";
import CreationModal from "../Creation-Modal/index";

const Options = ({ closeSearchBar = () => {} }: IOptions) => {
  const CUSTOM_WIDTH = "35%";
  const CUSTOM_HEIGHT = "100%";
  const [showCreationModal, setShowCreationModal] = useState(false);
  const { maps, setMaps } = useMapContext();

  const handleClick = (key: number) => {
    const action: string = OptionsTypes[key];
    if (action !== "location") {
      setMaps({
        ...maps,
        points: action === "directions" ? maps.defaultPoints : [],
        currentAction: action,
      });
      closeSearchBar();
      if (action === "directions") {
        const modal = new Context(new DirectionsRoute());
        modal.showModal();
      }
    } else if (action === "location") {
      const modal = new Context(new LocationMaintenance());
      modal.showModal();
    }
  };

  const onHelpStrategy = (key: number) => {
    switch (key) {
      case 1: {
        const modal = new Context(new Polygon());
        modal.showModal();
        break;
      }
      case 2: {
        const modal = new Context(new Location());
        modal.showModal();
        break;
      }
      case 3: {
        const modal = new Context(new Directions());
        modal.showModal();
        break;
      }
      case 4: {
        const modal = new Context(new Creation());
        modal.showModal();
        break;
      }
      default:
        return null;
    }
  };

  const showCreation = () => {
    setShowCreationModal(true);
  };

  return (
    <>
      <section className="options-container">
        <div className="options-container__item">
          <span
            className="options-container__selection"
            onClick={() => handleClick(1)}
            role="button"
            tabIndex={0}
          >
            <PolygonSearchSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
            <div className="options-container__content">
              <h3>Search by polygon</h3>
              <p>Search points based on a polygon that you draw!</p>
            </div>
          </span>
          <HelpIcon className="pointer" onClick={() => onHelpStrategy(1)} />
        </div>
        <div className="options-container__item">
          <span
            className="options-container__selection"
            onClick={() => handleClick(2)}
            role="button"
            tabIndex={0}
          >
            <LocationSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
            <div className="options-container__content">
              <h3>Search by location</h3>
              <p>Search a point based on your location given a radius.</p>
            </div>
          </span>
          <HelpIcon className="pointer" onClick={() => onHelpStrategy(2)} />
        </div>
        <div className="options-container__item">
          <span
            className="options-container__selection"
            onClick={() => handleClick(3)}
            role="button"
            tabIndex={0}
          >
            <DirectionsSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
            <div className="options-container__content">
              <h3>Directions</h3>
              <p>Select a point and get the directions from your location!</p>
            </div>
          </span>
          <HelpIcon className="pointer" onClick={() => onHelpStrategy(3)} />
        </div>
        <div className="options-container__item">
          <span
            className="options-container__selection"
            onClick={() => showCreation()}
            role="button"
            tabIndex={0}
          >
            <CreateSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
            <div className="options-container__content">
              <h3>Create new point</h3>
              <p>I think is not necessary to add a descripcion.</p>
            </div>
          </span>
          <HelpIcon className="pointer" onClick={() => onHelpStrategy(4)} />
        </div>
      </section>
      <CreationModal
        show={showCreationModal}
        onClose={() => setShowCreationModal(false)}
      />
    </>
  );
};

export default Options;
