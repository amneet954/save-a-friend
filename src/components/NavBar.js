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
import { makeStyles, fade } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navBarLink: {
    textDecoration: "none",
    color: "white",
    paddingRight: "5%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  outSearchLayer: {
    paddingRight: "5%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
          <Typography className={classes.title}>
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
