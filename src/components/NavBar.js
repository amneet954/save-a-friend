import { Link } from "react-router-dom";
import { logout } from "../store";
import {
  AppBar,
  IconButton,
  Typography,
  Button,
  Toolbar,
} from "@material-ui/core";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { makeStyles } from "@material-ui/core/styles";
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
}));

const NavBar = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const logOut = async () => await dispatch(logout());

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Welcome
            </Link>
            &nbsp;&nbsp;
            <Link
              to="/newReport"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Pet Alert
            </Link>
            &nbsp;&nbsp;
            <Link
              to="/reports"
              style={{ textDecoration: "none", color: "white" }}
            >
              Pet Status
            </Link>
            <Link to="/map" style={{ textDecoration: "none", color: "white" }}>
              Your Map
            </Link>
          </Typography>
          {state.user._id ? (
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              onClick={logOut}
            >
              <Button color="inherit">Logout</Button>
            </Link>
          ) : (
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              <Button color="inherit">Login/Sign Up</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
