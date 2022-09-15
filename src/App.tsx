import { useState } from "react";
import { Map } from "./components/Map/Map";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { MapsContext } from "./Context/context";
import "./App.scss";
import "sweetalert2/src/sweetalert2.scss";
import Information from "./components/Information/Information";
import LoaderProvider from "./components/Loader/Loader";
import { points } from "./statics/DefaultPoints";

const App = () => {
  const [maps, setMaps] = useState({
    points: points,
    defaultPoints: points,
    showDetails: false,
    currentAction: "",
  });

  const [loading, setLoading] = useState(false);

  const properties = { maps, setMaps, loading, setLoading };
  return (
    <MapsContext.Provider value={properties}>
      <div className="app">
        <SearchBar />
        <Map />
        <Information />
        <LoaderProvider />
      </div>
      <div id="modal-root"></div>
    </MapsContext.Provider>
  );
};

export default App;
