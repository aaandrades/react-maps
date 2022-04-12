import { ITextfield } from "../../Models/Interfaces";
import "./styles.scss";

const Textfield = ({ label, onChange, value, placeholder }: ITextfield) => {
  return (
    <div className="input-container">
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
    </div>
  );
};

export default Textfield;
