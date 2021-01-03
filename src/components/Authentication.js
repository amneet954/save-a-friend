import React, { useState } from "react";
import { login, register } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

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
    if (loginOrRegister !== "register") loginUser(event);
    else registerUser(event);
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.zoomOutButton}
          onClick={chooseLoginorRegister}
        >
          {loginOrRegister === "register"
            ? "I already have an account"
            : "Need an Account?"}
        </Button>
        <form
          onSubmit={(event) => handleSubmit(event)}
          className={classes.formCenter}
        >
          {loginOrRegister === "register" ? (
            <div>
              {registerFields.map((field, idx) => {
                return (
                  <TextField
                    key={idx}
                    className={classes.textFieldCenter}
                    required
                    fullWidth
                    name={field.eventName}
                    type={field.type}
                    label={field.label}
                    value={field.value}
                    onChange={(event) => field.function(event.target.value)}
                  />
                );
              })}
            </div>
          ) : (
            <span>
              {loginFields.map((field, idx) => {
                return (
                  <TextField
                    key={idx}
                    name={field.eventName}
                    type={field.type}
                    label={field.label}
                    value={field.value}
                    required
                    className={classes.loginFields}
                    onChange={(event) => field.function(event.target.value)}
                  />
                );
              })}
            </span>
          )}
          <br />
          <br />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.buttonCenter}
          >
            {loginOrRegister === "register" ? "Sign Up" : "Log In"}
          </Button>
        </form>
      </div>
    );
  }
};

export default Authentication;
