import "./styles.scss";
import { useState } from "react";
import Textfield from "../Textfield/Textfield";
import Button from "../Button/Button";
import { useMapContext } from "../../Context/context";
import Options from "../Options/Options";

export const SearchBar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const { maps, setMaps } = useMapContext();

  const handleSearch = () => {
    const currentPoints = maps.points;

    const mappedPoints = currentPoints.filter(
      (point) =>
        point.name.toLowerCase().includes(search.toLowerCase()) ||
        point.description.toLowerCase().includes(search.toLowerCase())
    );

    setMaps({
      ...maps,
      points: mappedPoints,
      showDetails: true,
    });
  };

  const clearSearch = () => {
    setSearch("");
    setMaps({
      ...maps,
      points: maps.defaultPoints,
    });
  };

  const closeSearchBar = () => {
    setShowSearchBar(false);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__search">
        <Textfield
          label="Look for something"
          value={search}
          clear={search !== ""}
          onClear={clearSearch}
          placeholder="Ej: Bar"
          className="search-bar__textfield"
          onChange={(e) => setSearch(e.target?.value)}
        />
        <Button
          onClick={() => handleSearch()}
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
          {showSearchBar ? "Close" : "More options"}
        </span>
      </div>
      <div
        className={showSearchBar ? "search-bar__open" : "search-bar__closed"}
      >
        <Options closeSearchBar={closeSearchBar} />
      </div>
    </div>
  );
};
