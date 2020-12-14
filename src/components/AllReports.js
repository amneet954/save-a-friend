import React, { useEffect } from "react";
import { gettingAllReports } from "../store";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

const AllReports = () => {
  const state = useSelector((state) => state);
  const { user } = state;
  const { report } = state;
  const dispatch = useDispatch();
  useEffect(() => dispatch(gettingAllReports(user._id)), []);

  if (!user._id) {
    return (
      <div>
        <h1>Please log in to view your pet case reports</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Hi from All Reports</h1>
        {Object.entries(report).map(([key, value]) => {
          return (
            <li key={key.id}>
              <Link to={value}>{value.petName}'s status</Link>
            </li>
          );
        })}
      </div>
    );
  }
};

export default AllReports;
