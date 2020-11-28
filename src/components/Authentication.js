import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const Authentication = (props) => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  let [data, setUsername] = useState(null);
  if (localStorage.getItem("user")) data = localStorage.getItem("user");

  const register = async () => {
    const response = await axios({
      method: "POST",
      data: {
        username: registerUsername,
        password: registerPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/register",
    });
    const { data } = response;
    console.log(data);
  };

  const login = async () => {
    const response = await axios({
      method: "POST",
      data: {
        username: loginUsername,
        password: loginPassword,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/login",
    });
    const { data } = response;
    let { _id, username } = data;
    console.log(data);
    localStorage.setItem("id", _id);
    localStorage.setItem("user", username);
    setUsername(localStorage.getItem("user"));
  };

  return (
    <div className="App">
      <div>
        <h1>Register</h1>
        <input
          placeholder="username"
          onChange={(event) => setRegisterUsername(event.target.value)}
        />
        <input
          placeholder="password"
          onChange={(event) => setRegisterPassword(event.target.value)}
        />
        <button onClick={register}>Submit</button>
      </div>

      <div>
        <h1>Login</h1>
        <input
          placeholder="username"
          onChange={(event) => setLoginUsername(event.target.value)}
        />
        <input
          placeholder="password"
          onChange={(event) => setLoginPassword(event.target.value)}
        />
        <button onClick={login}>Submit</button>
        {data || localStorage.getItem("user") ? (
          <h1>Welcome Back {data}</h1>
        ) : null}
      </div>
    </div>
  );
};

export default Authentication;
