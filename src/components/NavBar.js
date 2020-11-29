import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// export const Navbar = ({handleLogOut, isLoggedIn, cart}) => (

//     return (
//       <nav>
//         <Link to="/">Welcome!</Link>
//         {/* {this.state.data ? <Link to="/login">Value Appears</Link> : null} */}
//         <Link to="/login">Login/Register</Link>
//       </nav>
//     );

// }
const NavBar = ({ user }) => {
  return (
    // console.log(user)
    <div>
      <Link to="/" id="brand-name">
        Home
      </Link>
      {user.user._id ? <Link to="/login"> Value Appears </Link> : null}
      <Link to="/login">Login/Register</Link>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state,
  };
};

export default connect(mapState)(NavBar);
