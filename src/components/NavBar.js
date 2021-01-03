import { Link } from "react-router-dom";
import { logout } from "../store";
import {
  AppBar,
  Typography,
  Button,
  Toolbar,
  InputBase,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style/index.js";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

const NavBar = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const logOut = async () => await dispatch(logout());

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
          {state.user._id ? (
            <div className={classes.outSearchLayer}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
            </div>
          ) : null}
          {state.user._id ? (
            <Link to="/map" className={classes.accountButton}>
              <AccountCircleIcon />
            </Link>
          ) : null}
          {state.user._id ? (
            <Link to="/" className={classes.navBarLink} onClick={logOut}>
              <Button color="inherit">Logout</Button>
            </Link>
          ) : (
            <Link to="/login" className={classes.navBarLink}>
              <Button color="inherit">Login/Sign Up</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
