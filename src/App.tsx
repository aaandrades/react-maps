import "./App.css";
import { Map } from "./components/Map/Map";
import { SearchBar } from "./components/SearchBar/SearchBar";

const App = () => {
  return (
    <body>
      <SearchBar />
      <Map />
    </body>
  );
};

export default App;
