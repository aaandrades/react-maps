import CloseIcon from "../../assets/icons/close";
import { ITextfield } from "../../Models/Interfaces";
import "./styles.scss";

const Textfield = ({
  label,
  onChange,
  value,
  placeholder,
  className,
  onClear,
  clear,
}: ITextfield) => {
  return (
    <div className={`${className} input-container`}>
      <label htmlFor="input" className="input-container__label">
        {label}
      </label>
      <input
        id="input"
        className="input-container__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type="text"
      />
      {clear && (
        <span
          aria-label="close-icon"
          className="input-container__close"
          role="button"
          tabIndex={0}
          onClick={onClear}
        >
          <CloseIcon />
        </span>
      )}
    </div>
  );
};

export default Textfield;
