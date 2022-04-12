import "./styles.scss";
import { useState } from "react";
import Textfield from "../Textfield/Textfield";
import Button from "../Button/Button";

export const SearchBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");

  return (
    <div className="search-bar">
      <div className="search-bar__search">
        <Textfield
          label="Buscar"
          value={search}
          placeholder="Ej: Bar"
          onChange={(e) => setSearch(e.target?.value)}
        />
        <Button onClick={() => console.log("Click")}>Buscar</Button>
      </div>
      <button type="button" onClick={() => setShowSearchBar(!showSearchBar)}>
        X
      </button>
      <div
        className={showSearchBar ? "search-bar__open" : "search-bar__closed"}
      >
        Show/Close searchbar
      </div>
    </div>
  );
};
