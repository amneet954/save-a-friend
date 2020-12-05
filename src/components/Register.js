import React, { Component } from "react";
import { register } from "../store";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";

class Login extends Component {
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

  async register(event) {
    event.preventDefault();
    await this.props.dispatchNewUser(
      this.state.username,
      this.state.password,
      this.state.email,
      this.state.zipCode
    );
    this.props.history.push("/");
  }

  render() {
    return (
      <Container maxWidth="sm">
        <form onSubmit={this.register}>
          <h1 className="textCenter" style={{ paddingLeft: "200px" }}>
            Register
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
  dispatchNewUser: (username, password, email, zipCode) =>
    dispatch(register(username, password, email, zipCode)),
});

export default connect(mapState, mapDispatch)(Login);
