import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { AllReportsLogic, GenericPage } from "./childComponents";
import useStyles from "./style";
import axios from "axios";

const SearchPage = () => {
  const classes = useStyles();
  let [searchResults, setSearchResults] = useState("");
  let searchValue = sessionStorage.getItem("searchValue") || "default";

  const getResult = async () => {
    let response = await axios({
      method: "GET",
      withCredentials: true,
      baseURL: `http://localhost:4000/report/search/${searchValue}`,
    });
    let { data } = response;
    setSearchResults(data);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getResult();
  });

  let contentObj = {
    type: `${searchResults.length} Results Found`,
    pageInfo: "",
  };
  return (
    <Container className={classes.searchBarContainer}>
      {searchResults.length > 0 ? (
        <AllReportsLogic allReports={searchResults} />
      ) : (
        <GenericPage content={contentObj} />
      )}
    </Container>
  );
};

export default SearchPage;
