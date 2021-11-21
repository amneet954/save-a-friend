import React, { useState } from "react";
import SearchBar from "material-ui-search-bar";
import { useHistory } from "react-router-dom";

const Search = ({ setOpenDrawer }) => {
  let history = useHistory();
  let [filter, setFilter] = useState("");

  const handleSearchBar = (event) => {
    setFilter(event);
  };

  const clearSearch = (event) => {
    setFilter("");
  };

  const searchPet = () => {
    sessionStorage.setItem("searchValue", filter);
    setFilter("");
    history.push(`/search`);
    if (setOpenDrawer) {
      setOpenDrawer(false);
    }
  };

  return (
    <SearchBar
      value={filter}
      onChange={handleSearchBar}
      onRequestSearch={searchPet}
      onCancelSearch={clearSearch}
    />
  );
};

export default Search;
