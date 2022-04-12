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
          label="Look for something"
          value={search}
          placeholder="Ej: Bar"
          className="search-bar__textfield"
          onChange={(e) => setSearch(e.target?.value)}
        />
        <Button
          onClick={() => console.log("Click: ", search)}
          className="search-bar__button"
          disabled={!search}
        >
          Search
        </Button>
      </div>
      <div className="search-bar__footer">
        <span
          role="button"
          tabIndex={0}
          className="search-bar__options"
          onClick={() => setShowSearchBar(!showSearchBar)}
        >
          More options
        </span>
      </div>
      <div
        className={showSearchBar ? "search-bar__open" : "search-bar__closed"}
      >
        Contenido
      </div>
    </div>
  );
};
