import "./styles.scss";
import { useState } from "react";
import { useMapContext } from "../../Context/context";
import Options from "../Options/Options";
import { Button, TextField } from "@mui/material";

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
      currentAction: "",
    });
  };

  const closeSearchBar = () => {
    setShowSearchBar(false);
  };

  return (
    <div className="search-bar">
      <div className="search-bar__search">
        <TextField
          id="search"
          label="Look for something"
          variant="outlined"
          value={search}
          onChange={({ target }) => setSearch(target.value)}
          size="small"
        />
        <Button
          disabled={!search}
          onClick={() => handleSearch()}
          variant="contained"
        >
          Search
        </Button>
      </div>
      <div className="search-bar__footer">
        <Button
          size="small"
          className="search-bar__options"
          onClick={() => setShowSearchBar(!showSearchBar)}
        >
          {showSearchBar ? "Close" : "More options"}
        </Button>
        {maps.currentAction && (
          <Button onClick={() => clearSearch()} size="small" color="error">
            Close action
          </Button>
        )}
      </div>
      <div
        className={showSearchBar ? "search-bar__open" : "search-bar__closed"}
      >
        <Options closeSearchBar={closeSearchBar} />
      </div>
    </div>
  );
};
