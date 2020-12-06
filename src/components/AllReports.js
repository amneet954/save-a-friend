import React, { Component } from "react";
import { gettingAllReports } from "../store";
import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

class AllReports extends Component {
  async componentDidMount() {
    let userId = this.props.user._id;

    await this.props.dispatchReport(userId);
  }
  render() {
    let userId = this.props.user._id;
    console.log("from render", this.props.report);
    if (!userId) {
      return (
        <div>
          <h1>Please log in to view your pet case reports</h1>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Hi from All Reports</h1>
          {Object.entries(this.props.report).map(([key, value]) => {
            return (
              <li key={key.id}>
                <Link to={value}>
                  {value.petName}'s status
                  {console.log("value", value)}
                </Link>
              </li>
            );
          })}
        </div>
      );
    }
  }
}
const mapState = (state) => {
  return {
    user: state.user,
    report: state.report,
  };
};

const mapDispatch = (dispatch) => {
  return {
    dispatchReport: (userId) => dispatch(gettingAllReports(userId)),
  };
};

export default connect(mapState, mapDispatch)(AllReports);
