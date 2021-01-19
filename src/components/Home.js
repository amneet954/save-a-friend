import React, { useState, useEffect } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style";
import { gettingLocalActivePets } from "../store";

const Home = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  let [notSwitched, setNotSwitched] = useState(true);
  const { user, allReports } = state;
  const { username } = user;
  useEffect(() => {
    dispatch(gettingLocalActivePets());
  }, []);
  console.log(state.allReports);
  return (
    <Container maxWidth="sm">
      {username ? (
        <div>
          <h2 className={classes.loginButton}>Welcome Back {username}</h2>
        </div>
      ) : (
        <h2 className={classes.loginButton}>Login to Continue...</h2>
      )}
      <h2>Lost Pets in Your Area</h2>
      {allReports.map((pet) => {
        return (
          <span key={pet._id}>
            <h1>{pet.petName}</h1>
            <h2>{pet.lastPlaceSeen}</h2>
            <h3>{pet.lastTimeOfUpdate}</h3>
            <img
              src={`http://localhost:4000/report/pet/${pet._id}/${pet.petImageName}`}
              alt="recent"
              style={{ width: "500px" }}
            />
          </span>
        );
      })}
    </Container>
  );
};

export default Home;
