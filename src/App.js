import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState("");

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
    console.log(data);
  };

  const getUser = async () => {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      url: "http://localhost:4000/auth",
    });
    const { data } = response;
    setData(data);
    console.log(data.username);
  };

  // useEffect(() => {
  //   // Update the document title using the browser API
  //   if (data.username == null) document.title = "S-A-F";
  //   else document.title = data.username;
  // });

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
      </div>

      <div>
        <h1>Get User</h1>
        <button onClick={getUser}>Submit</button>
        {data ? <h1>Welcome Back {data.username}</h1> : null}
      </div>
    </div>
  );
};

export default App;
