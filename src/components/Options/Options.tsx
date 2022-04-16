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
} from "../../providers/ModalProvider";

const Options = () => {
  const CUSTOM_WIDTH = "35%";
  const CUSTOM_HEIGHT = "100%";

  const handleClick = () => {
    console.log("click");
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

  return (
    <section className="options-container">
      <div className="options-container__item">
        <span
          className="options-container__selection"
          onClick={() => handleClick()}
          role="button"
          tabIndex={0}
        >
          <PolygonSearchSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
          <div className="options-container__content">
            <h3>Search by polygon</h3>
            <p>Just a description on how to use the functions</p>
          </div>
        </span>
        <HelpIcon className="pointer" onClick={() => onHelpStrategy(1)} />
      </div>
      <div className="options-container__item">
        <span
          className="options-container__selection"
          onClick={() => handleClick()}
          role="button"
          tabIndex={0}
        >
          <LocationSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
          <div className="options-container__content">
            <h3>Search by location</h3>
            <p>Just a description on how to use the functions</p>
          </div>
        </span>
        <HelpIcon className="pointer" onClick={() => onHelpStrategy(2)} />
      </div>
      <div className="options-container__item">
        <span
          className="options-container__selection"
          onClick={() => handleClick()}
          role="button"
          tabIndex={0}
        >
          <DirectionsSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
          <div className="options-container__content">
            <h3>Directions</h3>
            <p>Just a description on how to use the functions</p>
          </div>
        </span>
        <HelpIcon className="pointer" onClick={() => onHelpStrategy(3)} />
      </div>
      <div className="options-container__item">
        <span
          className="options-container__selection"
          onClick={() => handleClick()}
          role="button"
          tabIndex={0}
        >
          <CreateSvg width={CUSTOM_WIDTH} height={CUSTOM_HEIGHT} />
          <div className="options-container__content">
            <h3>Create new point</h3>
            <p>Just a description on how to use the functions</p>
          </div>
        </span>
        <HelpIcon className="pointer" onClick={() => onHelpStrategy(4)} />
      </div>
    </section>
  );
};

export default Options;
