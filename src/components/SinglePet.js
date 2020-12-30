import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation, gettingAllReports } from "../store";
import { Button, Container } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { gettingSingleReport } from "../store";
import axios from "axios";

const SinglePet = ({ match }) => {
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { report } = allState;
  const { id } = match.params;

  useEffect(() => {
    console.log(id);
    dispatch(gettingSingleReport(id));
    // setPetObj(report);
  }, []);

  return (
    <div>
      <h1>hi</h1>
      <button onClick={() => console.log(report.query)}>test</button>
      {report.file ? (
        <img
          src={`http://localhost:4000/report/pet/${id}/${report.file.filename}`}
          alt="recent"
          style={{ width: "500px" }}
        />
      ) : null}
    </div>
  );
};

export default SinglePet;
