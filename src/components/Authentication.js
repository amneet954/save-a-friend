import React, { useState, useEffect } from "react";
import { login, register } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import useStyles from "./style";
const Authentication = () => {
  const state = useSelector((state) => state);
  const { user } = state;
  const dispatch = useDispatch();
  let [loginUsername, setLoginUsername] = useState("");
  let [loginPassword, setLoginPassword] = useState("");
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");
  let [zipCode, setZipCode] = useState("");
  const classes = useStyles();

  const loginUser = async (event) => {
    event.preventDefault();
    await dispatch(login(loginUsername, loginPassword));
  };

  const registerUser = async (event) => {
    event.preventDefault();
    await dispatch(register(username, password, email, zipCode));
  };

  let loginFields = [
    {
      value: loginUsername,
      function: setLoginUsername,
      eventName: "username",
      label: "Enter Username",
      type: "text",
    },
    {
      value: loginPassword,
      function: setLoginPassword,
      eventName: "password",
      label: "Enter Password",
      type: "password",
    },
  ];

  let registerFields = [
    {
      value: username,
      function: setUsername,
      eventName: "username",
      label: "Enter Username",
      type: "text",
    },
    {
      value: password,
      function: setPassword,
      eventName: "password",
      label: "Enter Passsword",
      type: "password",
    },
    {
      value: email,
      function: setEmail,
      eventName: "email",
      label: "Enter Email Address",
      type: "email",
    },
    {
      value: zipCode,
      function: setZipCode,
      eventName: "zipCode",
      label: "Enter Zip Code",
      type: "number",
    },
  ];
  let [loginOrRegister, setDecision] = useState("");

  const chooseLoginorRegister = () => {
    if (loginOrRegister !== "register") setDecision("register");
    else setDecision("login");
  };

  const handleSubmit = (event) => {
    if (loginOrRegister !== "register") registerUser(event);
    else loginUser(event);
  };
  if (user._id) {
    return <Redirect to="/map" />;
  } else {
    return (
      <div>
        <button onClick={chooseLoginorRegister}>
          {loginOrRegister === "register"
            ? "I already have an account"
            : "Need an Account?"}
        </button>
        <form onSubmit={(event) => handleSubmit(event)}>
          {loginOrRegister === "register" ? (
            <h1>register form</h1>
          ) : (
            <h1>login form</h1>
          )}
          <Button>
            {loginOrRegister === "register" ? "Sign Up" : "Log In"}
          </Button>
        </form>
      </div>
    );
  }
};

export default Authentication;
{
  /* <Container maxWidth="sm">
<form onSubmit={loginUser}>
  <h1 className="textCenter" className={classes.title}>
    Login
  </h1>
  <Grid container spacing={10}>
    <Grid
      item
      form="maincomponent"
      style={{ display: "flex", flexGrow: 1 }}
    >
      {loginFields.map((field, idx) => {
        return (
          <TextField
            key={idx}
            name={field.eventName}
            type={field.type}
            label={field.label}
            value={field.value}
            required
            fullWidth
            onChange={(event) => field.function(event.target.value)}
          />
        );
      })}
      &ensp;
      <Button
        type="submit"
        style={{ backgroundColor: "blue" }}
        className={classes.loginButton}
      >
        Submit
      </Button>
    </Grid>
  </Grid>
</form>
<br></br>
<h1 style={{ textAlign: "center" }}>or...</h1>
<br></br>
<form onSubmit={registerUser}>
  <h1 className="textCenter" style={{ textAlign: "center" }}>
    Sign Up!
  </h1>
  {registerFields.map((field, idx) => (
    <div>
      <TextField
        key={idx}
        name={field.eventName}
        type={field.type}
        label={field.label}
        value={field.value}
        required
        fullWidth
        onChange={(event) => field.function(event.target.value)}
      />
      <br />
    </div>
  ))}
  <br></br>
  <Button
    type="submit"
    style={{ backgroundColor: "blue" }}
    className={classes.loginButton}
  >
    Submit
  </Button>
</form>
</Container> */
}
