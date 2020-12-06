import React, { Component } from "react";
import { reportCreation } from "../store";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";

// const CreateReportForm = ({ user }) => {
class CreateReportForm extends Component {
  constructor() {
    super();
    this.state = {
      petName: "",
      lastPlaceSeen: "",
      contactEmail: "",
      zipCode: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.createReport = this.createReport.bind(this);
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

  handleChange(event) {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
  }

  async createReport(event) {
    event.preventDefault();
    let { petName, lastPlaceSeen, contactEmail, zipCode } = this.state;
    let userId = this.props.user.user._id;
    await this.props.dispatchReport(
      userId,
      petName,
      lastPlaceSeen,
      contactEmail,
      zipCode
    );
    console.log(this.props.user);
    // alert("Case sucessfully created");
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
            <form onSubmit={this.createReport}>
              <div>
                <label htmlFor="Pet's Name">Pet's name: </label>
                <input name="petName" onChange={this.handleChange} required />
              </div>
              <div>
                <label htmlFor="Last Seen">Last Seen: </label>
                <input
                  name="lastPlaceSeen"
                  onChange={this.handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="Zip Code">Zip Code: </label>
                <input name="zipCode" onChange={this.handleChange} required />
              </div>
              <div>
                <label htmlFor="Contact Email Address">
                  Contact Email Address:{" "}
                </label>
                <input
                  name="contactEmail"
                  onChange={this.handleChange}
                  required
                />
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
    // report: state,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatchReport: (userId, petName, lastPlaceSeen, contactEmail, zipCode) =>
      dispatch(
        reportCreation(userId, petName, lastPlaceSeen, contactEmail, zipCode)
      ),
  };
};

export default connect(mapState, mapDispatch)(CreateReportForm);
