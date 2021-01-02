import React, { useEffect } from "react";
import { gettingAllReports } from "../store";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AllReports = () => {
  const state = useSelector((state) => state);
  const { user, allReportsReducer } = state;
  const dispatch = useDispatch();
  useEffect(() => dispatch(gettingAllReports(user._id)), []);

  if (!user._id) {
    return (
      <div>
        <h1>Please log in to view your pet case reports</h1>
      </div>
    );
  } else {
    console.log(allReportsReducer);
    return (
      <div>
        <h1>Hi from All Reports</h1>

        {allReportsReducer.map((pet, idx) => {
          return (
            //CHANGE API BACKEND CALL TO INCLUDE PICTURE?
            <div key={idx} style={{ outlineStyle: "solid" }}>
              <h1>Name: {pet.petName}</h1>
              <h2> Last Seen: {pet.lastPlaceSeen}</h2>
              <h2>Last Time of Update: {pet.lastTimeOfUpdate} </h2>
            </div>
          );
        })}
      </div>
    );
  }
};

export default AllReports;
