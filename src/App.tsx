import { useState } from "react";
import "./App.scss";
import { Map } from "./components/Map/Map";
import { SearchBar } from "./components/SearchBar/SearchBar";
import { MapsContext } from "./Context/context";
import { points } from "./statics/DefaultPoints";

const App = () => {
  const [maps, setMaps] = useState({
    points: points,
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
