import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "../../assets/icons/close";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./styles.scss";
import { useMapContext } from "../../Context/context";

const initialForm = {
  name: "",
  description: "",
  latitude: 0,
  longitude: 0,
  minValue: 0,
  maxValue: 0,
};
const CreationModal = ({ show, onClose }: IProps) => {
  const container = useRef(document.createElement("div"));
  const { setMaps, maps } = useMapContext();
  const [close, setClose] = useState(false);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    container.current.classList.add("root-modal");
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  const handleClose = () => {
    setClose(true);
    setForm(initialForm);
    setTimeout(() => {
      onClose();
      setClose(false);
    }, 250);
  };

  const handleChange = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const createPoint = () => {
    const newPoint = {
      _id: { $oid: 1 },
      name: form.name,
      description: form.description,
      location: { coordinates: [form.longitude, form.latitude], type: "Point" },
      maxValue: form.maxValue,
      minValue: form.minValue,
    };
    setMaps({
      ...maps,
      defaultPoints: [...maps.defaultPoints, newPoint],
      points: [...maps.defaultPoints, newPoint],
    });
    handleClose();
  };

  const content = () => {
    return (
      <section className="modal-container" onClick={() => handleClose()}>
        <article
          onClick={(e) => e.stopPropagation()}
          className={`modal-container__content  ${
            close ? "modal-container__closing" : ""
          }`}
        >
          <div className="modal-container__content--header">
            <h1>Tavern creation</h1>
            <span
              role="button"
              tabIndex={0}
              title="Close"
              onClick={() => handleClose()}
              className="modal-container__content--close-button"
            >
              <CloseIcon />
            </span>
          </div>
          <div className="modal-container__content--body">
            <p>
              Fill the bellow fields to create your Tavern point. Remember, the
              point will be stored just in the state, not in a backend :)
            </p>
            <div className="modal-container__content--rows">
              <TextField
                className="modal-container__content--inputs"
                label="Name"
                name="name"
                value={form.name}
                size="small"
                onChange={(event) => handleChange(event)}
              />
              <TextField
                className="modal-container__content--inputs"
                label="Description"
                name="description"
                value={form.description}
                size="small"
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className="modal-container__content--rows">
              <TextField
                className="modal-container__content--inputs"
                label="Latitude"
                name="latitude"
                value={form.latitude}
                type="number"
                size="small"
                onChange={(event) => handleChange(event)}
              />
              <TextField
                className="modal-container__content--inputs"
                label="Longitude"
                name="longitude"
                value={form.longitude}
                type="number"
                size="small"
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className="modal-container__content--rows">
              <TextField
                className="modal-container__content--inputs"
                label="Min price of drinks"
                name="minValue"
                value={form.minValue}
                type="number"
                size="small"
                onChange={(event) => handleChange(event)}
              />
              <TextField
                className="modal-container__content--inputs"
                label="Max price of drinks"
                name="maxValue"
                value={form.maxValue}
                type="number"
                size="small"
                onChange={(event) => handleChange(event)}
              />
            </div>
            <div className="modal-container__content--buttons">
              <Button
                disabled={
                  !form.latitude ||
                  !form.longitude ||
                  !form.minValue ||
                  !form.maxValue ||
                  !form.name
                }
                variant="contained"
                className="modal-container__content--main"
                onClick={() => createPoint()}
              >
                Create
              </Button>
              <Button onClick={() => handleClose()}>Cancel</Button>
            </div>
          </div>
        </article>
      </section>
    );
  };

  return show ? ReactDOM.createPortal(content(), container.current) : null;
};

interface IProps {
  show: boolean;
  onClose(): void;
}

export default CreationModal;
