import { IButton } from "../../Models/Interfaces";
import "./styles.scss";
const Button = ({ children, onClick, disabled, className }: IButton) => {
  return (
    <button
      className={`${className} button-container ${
        disabled ? "disable-btn" : ""
      }`}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
