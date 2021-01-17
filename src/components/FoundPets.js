import React, { useEffect } from "react";
import { gettingFoundPetsType } from "../store";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style";
import { AllReportsLogic } from "./childComponents";

const FoundPets = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const { allReports } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(gettingFoundPetsType("found"));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>Found Pets here</h1>
      {allReports.length > 0 ? (
        <AllReportsLogic allReports={allReports} />
      ) : null}
    </div>
  );
};

export default FoundPets;
