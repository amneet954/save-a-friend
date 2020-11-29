// import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const NavBar = ({ user }) => {
  return (
    <nav>
      <Link to="/">Welcome!</Link>
      {user.user._id ? <Link to="/login"> Value Appears </Link> : null}
      <Link to="/login">Login/Register</Link>
    </nav>
  );
};

const mapState = (state) => {
  return {
    user: state,
  };
};

export default connect(mapState)(NavBar);
