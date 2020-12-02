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
      data: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.register = this.register.bind(this);
  }

  componentDidMount() {
    let userId = this.props.userInfo.user._id;
    if (userId) {
      alert(`You have already logged in. Id: ${userId}`);
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
    await this.props.dispatchNewUser(this.state.username, this.state.password);
    this.props.history.push("/");
  }

  async login(event) {
    event.preventDefault();
    await this.props.dispatchUser(this.state.username, this.state.password);
    this.props.history.push("/");
  }

  render() {
    return (
      // <div className="App">
      <Container maxWidth="sm">
        <form onSubmit={this.register}>
          <h1 className="textCenter" style={{ paddingLeft: "200px" }}>
            Register
          </h1>
          <div style={{ paddingLeft: "100px" }}>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
            />
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />
            </span>
            <span style={{ paddingLeft: "10px" }}>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </span>
          </div>
        </form>
        <form onSubmit={this.login}>
          <h1 className="textCenter" style={{ paddingLeft: "210px" }}>
            Login
          </h1>
          <span style={{ paddingLeft: "100px" }}>
            <input
              placeholder="username"
              name="username"
              onChange={this.handleChange}
            />
            <span style={{ paddingLeft: "5px" }}>
              <input
                placeholder="password"
                name="password"
                onChange={this.handleChange}
              />
            </span>
            <span style={{ paddingLeft: "10px" }}>
              <Button type="submit" color="primary">
                Submit
              </Button>
            </span>
          </span>
        </form>
      </Container>
      // </div>
    );
  }
}

const mapState = (state) => ({
  userInfo: state,
});

const mapDispatch = (dispatch) => ({
  dispatchUser: (username, password) => dispatch(login(username, password)),
  dispatchNewUser: (username, password) =>
    dispatch(register(username, password)),
});

export default connect(mapState, mapDispatch)(Authentication);
