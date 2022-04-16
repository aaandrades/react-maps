import { useState } from "react";
import { Map } from "./components/Map/Map";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { MapsContext } from "./Context/context";
import { points } from "./Statics/DefaultPoints";
import "./App.scss";
import "sweetalert2/src/sweetalert2.scss";

const App = () => {
  const [maps, setMaps] = useState({
    points: points,
    defaultPoints: points,
  });

  const properties = { maps, setMaps };
  return (
    <MapsContext.Provider value={properties}>
      <div className="app">
        <SearchBar />
        <Map />
      </div>
    </MapsContext.Provider>
  );
};

export default App;
