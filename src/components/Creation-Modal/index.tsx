import "./styles.scss";

const CreationModal = ({ show }: IProps) => {
  return (
    <section
      className={`modal-container ${show ? "show-modal" : "disable-modal"}`}
    >
      <div
        className={`modal-container__content ${
          show ? "show-modal" : "disable-modal"
        }`}
      >
        contenido rapidito
      </div>
    </section>
  );
};

interface IProps {
  show: boolean;
}

export default CreationModal;
