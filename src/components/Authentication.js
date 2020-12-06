import React, { Component } from "react";
import { login, register } from "../store";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";

class Authentication extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      zipCode: "",
      data: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    let userId = this.props.userInfo.user._id;
    if (userId) {
      alert(`You are already logged in. Id: ${userId}`);
      this.props.history.push("/");
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async login(event) {
    event.preventDefault();
    await this.props.dispatchUser(this.state.username, this.state.password);
    this.props.history.push("/");
  }

  async register(event) {
    event.preventDefault();
    await this.props.dispatchNewUser(
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.zipCode
    );
    await this.props.dispatchUser(this.state.username, this.state.password);
    this.props.history.push("/");
  }

  render() {
    return (
      <Container maxWidth="sm">
        <form onSubmit={this.login}>
          <h1 className="textCenter" style={{ textAlign: "center" }}>
            Login
          </h1>
          <span style={{ paddingLeft: "100px" }}>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
              required
            />
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="password"
                type="password"
                name="password"
                onChange={this.handleChange}
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
        <form onSubmit={this.register}>
          <h1 className="textCenter" style={{ textAlign: "center" }}>
            Sign Up!
          </h1>
          <div style={{ paddingLeft: "100px" }}>
            <input
              placeholder="Username"
              name="username"
              onChange={this.handleChange}
              required
            />
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="Password"
                type="password"
                name="password"
                onChange={this.handleChange}
                required
              />
            </span>
            <span>
              <input
                placeholder="Email Address"
                type="email"
                name="email"
                onChange={this.handleChange}
                required
              />
            </span>
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="Zip Code"
                type="text"
                name="zipCode"
                onChange={this.handleChange}
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
}

const mapState = (state) => ({
  userInfo: state,
});

const mapDispatch = (dispatch) => ({
  dispatchUser: (username, password) => dispatch(login(username, password)),
  dispatchNewUser: (username, password, email, zipCode) =>
    dispatch(register(username, password, email, zipCode)),
});

export default connect(mapState, mapDispatch)(Authentication);
