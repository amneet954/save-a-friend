import React, { useState, useEffect } from "react";
import { login, register, updatingUserInfo } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Grid, TextField } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { Alert, Paper } from "@mui/material/";
import useStyles from "./style";

const UserFields = () => {
  const state = useSelector((state) => state);
  const { user } = state;
  const dispatch = useDispatch();
  const classes = useStyles();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");
  let [passwordConfirm, setPasswordConfirm] = useState("");
  let [email, setEmail] = useState("");
  let [updateType, setUpdateType] = useState("Login");
  let [complete, setComplete] = useState(false);
  let [loginFail, setLoginFail] = useState(false);
  let [failReason, setFailReason] = useState("");

  const userAction = async (event) => {
    event.preventDefault();
    let check;
    switch (updateType) {
      case "Login":
        await dispatch(login(username, password));
        clearUserFields();
        if (user.error) {
          let value = user.error ? user.error : null;
          setFailReason(value);
          setLoginFail(true);
        }
        break;
      case "Password Reset":
        check = passwordCheck();
        if (check) {
          await dispatch(
            updatingUserInfo(username, password, email, updateType)
          );
          clearUserFields();
          setUpdateType("Login");
        }
        break;
      case "Register":
        check = passwordCheck();
        if (check) {
          await dispatch(register(username, password, email));
          clearUserFields();
        }
        break;
      default:
        return [];
    }
  };

  const passwordCheck = () => {
    if (password === passwordConfirm) return true;
    else {
      setFailReason(
        "Please use the same password phrase for both password fields"
      );
      setLoginFail(true);
      return false;
    }
  };

  const changeUserFields = (event, value) => {
    event.preventDefault();
    sessionStorage.setItem("auth", value);
    clearUserFields();
    setUpdateType(value);
  };

  const clearUserFields = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setUpdateType("Login");
    setComplete("");
    setLoginFail("");
    setEmail("");
  };

  let infoFields = [
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
      label:
        updateType === "Password Reset"
          ? "Enter New Password"
          : "Enter Password",
      type: "password",
    },
    {
      value: passwordConfirm,
      function: setPasswordConfirm,
      eventName: "passwordConfirm",
      label:
        updateType === "Password Reset"
          ? "Enter New Password Again"
          : "Enter Password Again",
      type: "password",
    },
    {
      value: email,
      function: setEmail,
      eventName: "email",
      label: "Enter Email Address",
      type: "email",
    },
  ];

  let secondMenu = [
    {
      msg:
        updateType === "Register"
          ? "I already have an account"
          : "I need an account",
      valueChange: updateType === "Register" ? "Login" : "Register",
    },
    { msg: "Forgot Password?", valueChange: "Password Reset" },
  ];

  const arrayType = () => {
    switch (updateType) {
      case "Login":
        return infoFields.slice(0, 2);
      case "Password Reset":
      case "Register":
      default:
        return infoFields;
    }
  };
  let array = arrayType();

  useEffect(() => {
    let auth = sessionStorage.getItem("auth");
    if (updateType !== "Login" && auth === "Login") {
      setUpdateType("Login");
      setLoginFail(false);
    }
  });

  if (user._id) {
    return <Redirect to="/" />;
  } else {
    return (
      <Container>
        <Paper className={classes.authPaper}>
          <form onSubmit={(event) => userAction(event)}>
            <Container>
              <Container className={classes.authPaperContainer}>
                {array.map((field, idx) => {
                  return (
                    <Container key={idx} className={classes.authTextContainer}>
                      <p className={classes.authText}>{field.label}</p>
                      <Container>
                        <TextField
                          variant="filled"
                          required
                          fullWidth
                          name={field.eventName}
                          type={field.type}
                          value={field.value}
                          className={classes.authTextField}
                          inputProps={{
                            style: {
                              textAlign: "center",
                            },
                          }}
                          onChange={(event) =>
                            field.function(event.target.value)
                          }
                        />
                      </Container>
                    </Container>
                  );
                })}
              </Container>
            </Container>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.zoomOutButton}
            >
              {updateType}
            </Button>
          </form>
        </Paper>
        {loginFail ? (
          <Container className={classes.authFailureMessage}>
            <Alert fullWidth severity="error" variant="string">
              {failReason !== "No User Exists"
                ? failReason
                : "Incorrect Login Credentials"}
            </Alert>
          </Container>
        ) : null}
        <Grid container span className={classes.authSecondaryButtonContainer}>
          {secondMenu.map((field, idx) => (
            <Grid
              item
              xs={12}
              sm={6}
              key={idx}
              className={classes.authSecondaryButtons}
            >
              <Button
                className={classes.whiteText}
                onClick={(event) => changeUserFields(event, field.valueChange)}
              >
                {field.msg}
              </Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }
};

export default UserFields;
