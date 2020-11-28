import React from "react";
import { Link } from "react-router-dom";

const NavBar = (props) => {
  return (
    <nav>
      <Link to="/">Welcome!</Link>
      <Link to="/test">Test</Link>
    </nav>
  );
};

export default NavBar;
