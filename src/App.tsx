import { useEffect } from "react";
import "./App.scss";
import { Map } from "./components/Map/Map";
import { SearchBar } from "./components/SearchBar/SearchBar";

const App = () => {
  useEffect(() => {}, []);

  return (
    <div className="app">
      <SearchBar />
      <Map />
    </div>
  );
};

export default App;
