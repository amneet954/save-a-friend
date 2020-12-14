import React, { useState, useEffect } from "react";
import { login, register } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container } from "@material-ui/core";

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

  const loginUser = async (event) => {
    event.preventDefault();
    await dispatch(login(loginUsername, loginPassword));
  };

  const registerUser = async (event) => {
    event.preventDefault();
    await dispatch(register(username, password, email, zipCode));
  };

  if (user._id) {
    console.log(user);
    return <div>Profile component</div>;
  } else {
    return (
      <Container maxWidth="sm">
        <form onSubmit={loginUser}>
          <h1 className="textCenter" style={{ textAlign: "center" }}>
            Login
          </h1>
          <span style={{ paddingLeft: "100px" }}>
            <input
              placeholder="username"
              name="username"
              onChange={(event) => setLoginUsername(event.target.value)}
              required
            />
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="password"
                type="password"
                name="password"
                onChange={(event) => setLoginPassword(event.target.value)}
                required
              />
            </span>
            <span style={{ paddingLeft: "10px" }}>
              <Button
                type="submit"
                color="inherit"
                style={{
                  color: "white",
                  backgroundColor: "#00e600",
                }}
              >
                Submit
              </Button>
            </span>
          </span>
        </form>
        <br></br>
        <h1 style={{ textAlign: "center" }}>or...</h1>
        <br></br>
        <form onSubmit={registerUser}>
          <h1 className="textCenter" style={{ textAlign: "center" }}>
            Sign Up!
          </h1>
          <div style={{ paddingLeft: "100px" }}>
            <input
              placeholder="Username"
              name="username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </span>
            <span>
              <input
                placeholder="Email Address"
                type="email"
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </span>
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="Zip Code"
                type="text"
                name="zipCode"
                onChange={(event) => setZipCode(event.target.value)}
                required
              />
            </span>
            <br></br>
            <br></br>
            <div style={{ paddingLeft: "115px" }}>
              <Button
                type="submit"
                style={{
                  color: "white",
                  backgroundColor: "#00e600",
                }}
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
      </Container>
    );
  }
};

export default Authentication;
