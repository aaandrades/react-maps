import "./styles.scss";
import { useMapContext } from "../../Context/context";

const LoaderProvider = () => {
  const { loading } = useMapContext();
  return loading ? (
    <section className="loader-container">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default LoaderProvider;
