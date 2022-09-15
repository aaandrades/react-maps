import { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import CloseIcon from "../../assets/icons/close";
import TextField from "@mui/material/TextField";
import "./styles.scss";

const CreationModal = ({ show, onClose }: IProps) => {
  const [close, setClose] = useState(false);
  const container = useRef(document.createElement("div"));

  useEffect(() => {
    container.current.classList.add("root-modal");
    document.body.appendChild(container.current);
    return () => {
      document.body.removeChild(container.current);
    };
  }, []);

  const handleClose = () => {
    setClose(true);
    setTimeout(() => {
      onClose();
      setClose(false);
    }, 250);
  };

  const content = () => {
    return (
      <section className="modal-container">
        <article
          className={`modal-container__content  ${
            close ? "modal-container__closing" : ""
          }`}
        >
          <div className="modal-container__content--header">
            <h1>Point creation</h1>
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
          <div>
            contenido rapidito
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
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
