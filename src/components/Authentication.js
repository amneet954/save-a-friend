import React, { Component } from "react";
import { auth } from "../store";
import { connect } from "react-redux";
import axios from "axios";
import "../App.css";

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      data: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    // console.log("from componentdidmount", this.props.userInfo.user._id);
    if (this.props.userInfo.user._id) {
      console.log("Not allowed anymore");
      this.props.history.push("/");
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async register(event) {
    event.preventDefault();
    console.log("well");
    const response = await axios({
      method: "POST",
      data: {
        username: this.state.username,
        password: this.state.password,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/register",
    });
    const { data } = response;
    console.log(data);
  }

  async login(event) {
    event.preventDefault();
    await this.props.dispatchCases(this.state.username, this.state.password);
    this.props.history.push("/");
  }
  render() {
    return (
      <div className="App">
        <form onSubmit={this.register}>
          <h1>Register</h1>
          <input
            placeholder="username"
            name="username"
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            name="password"
            onChange={this.handleChange}
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        <form onSubmit={this.login}>
          <h1>Login</h1>
          <input
            placeholder="username"
            name="username"
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            name="password"
            onChange={this.handleChange}
          />
          <button type="submit" className="submitButton">
            Submit
          </button>
        </form>
        {/* {data || localStorage.getItem("user") ? (
          <h1>Welcome Back {data}</h1>
        ) : null} */}
      </div>
    );
  }
}

const mapState = (state) => ({
  userInfo: state,
});

const mapDispatch = (dispatch) => ({
  dispatchCases: (username, password) => dispatch(auth(username, password)),
});

export default connect(mapState, mapDispatch)(Authentication);
