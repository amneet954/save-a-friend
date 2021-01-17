import React, { useEffect } from "react";
import { gettingFoundPetsType } from "../store";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style";
import { AllReportsLogic } from "./childComponents";

const AllReports = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const { user, allReports } = state;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettingFoundPetsType("lost"));
    // eslint-disable-next-line
  }, []);
  console.log(allReports);
  return (
    <div>
      <h1>All Active Reports</h1>
      {allReports.length > 0 ? (
        <AllReportsLogic allReports={allReports} />
      ) : null}
    </div>
  );
};

export default AllReports;
