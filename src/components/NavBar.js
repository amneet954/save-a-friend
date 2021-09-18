import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { AppBar, Typography, Button, Toolbar } from "@material-ui/core";
import SearchBar from "material-ui-search-bar";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style/index.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useHistory } from "react-router-dom";

const NavBar = () => {
  let history = useHistory();

  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const logOut = async () => await dispatch(logout());
  const [filter, setFilter] = useState("");

  const handleSearchBar = (event) => {
    setFilter(event);
  };

  const clearSearch = (event) => {
    setFilter("");
  };

  const searchPet = () => {
    history.push(`/reports`);
  };

  const unauthNavLinks = [
    {
      link: "/",
      title: "Welcome",
    },
    {
      link: "/reports",
      title: "All Lost Friends",
    },
    {
      link: "/foundFriends",
      title: "Community Accomplishments",
    },
    {
      link: "/newReport",
      title: "Create an Alert",
    },
    {
      link: "/map",
      title: "Map",
    },
    {
      link: "/aboutUs",
      title: "About Us",
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.navbarTitle}>
            {unauthNavLinks.map((link, idx) => (
              <Link key={idx} to={link.link} className={classes.navBarLink}>
                {link.title}
              </Link>
            ))}
          </Typography>

          <SearchBar
            value={filter}
            onChange={handleSearchBar}
            onRequestSearch={searchPet}
            onCancelSearch={clearSearch}
          />
          {/* {state.user._id ? (
            <Link to="/map" className={classes.accountButton}>
              <AccountCircleIcon />
            </Link>
          ) : null} */}
          <div className={classes.outSearchLayer}>
            {state.user._id ? (
              <Link to="/" className={classes.navBarLink} onClick={logOut}>
                <Button color="inherit">Logout</Button>
              </Link>
            ) : (
              <Link to="/login" className={classes.navBarLink}>
                <Button color="inherit">Login/Sign Up</Button>
              </Link>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
