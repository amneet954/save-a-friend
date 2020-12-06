import React, { Component } from "react";
import { logout } from "../store";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";

// const CreateReportForm = ({ user }) => {
class CreateReportForm extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      zipCode: "",
      data: "",
    };
    // this.handleChange = this.handleChange.bind(this);
    // this.login = this.login.bind(this);
    // this.register = this.register.bind(this);
  }

  componentDidMount() {
    let userId = this.props.user.user._id;
    if (!userId) {
      alert(`Please log in to create a lost pet report`);
      this.props.history.push("/login");
    }
  }
  render() {
    let username = this.props.user.user.username;
    let id = this.props.user.user._id;
    // console.log(this.props.user);
    if (id) {
      return (
        <div>
          <h1>Hi {username}, let's save your pet!</h1>
          <Container maxWidth="sm">
            <form>
              <div>
                <label htmlFor="Pet's Name">Pet's name: </label>
                <input />
              </div>
              <div>
                <label htmlFor="Last Seen">Last Seen: </label>
                <input />
              </div>
              <div>
                <label htmlFor="Zip Code">Zip Code: </label>
                <input />
              </div>
              <div>
                <label htmlFor="Contact Email Address">
                  Contact Email Address:{" "}
                </label>
                <input />
              </div>
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
            </form>
          </Container>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Please login in or sign up to create report</h1>
        </div>
      );
    }
  }
}

const mapState = (state) => {
  return {
    user: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleLogOut() {
      dispatch(logout());
    },
  };
};

export default connect(mapState, mapDispatch)(CreateReportForm);
