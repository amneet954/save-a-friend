import { Link } from "react-router-dom";
import { connect } from "react-redux";
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

const NavBar = ({ user, handleLogOut }) => {
  const classes = useStyles();
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
              to="/report"
              style={{ textDecoration: "none", color: "white" }}
            >
              Create Pet Alert
            </Link>
          </Typography>
          {user.user._id ? (
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white" }}
              onClick={handleLogOut}
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

export default connect(mapState, mapDispatch)(NavBar);

// {
//   user.user._id ? (
//     <span>
//       <Link to="/" onClick={handleLogOut}>
//         Logout
//       </Link>
//     </span>
//   ) : (
//     <Link to="/login">Login/Register</Link>
//   );
// }

{
  /* <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="white"
            aria-label="menu"
          >
            <Link to="/">Welcome!</Link>
          </IconButton>
          <IconButton color="inherit" aria-label="menu">
            {user.user._id ? (
              <span>
                <Link to="/" onClick={handleLogOut}>
                  Logout
                </Link>
              </span>
            ) : (
              <Link to="/login">Login/Register</Link>
            )}
          </IconButton>
        </Toolbar> */
}

{
  /* <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="white"
            aria-label="menu"
          >
            <Link to="/">Welcome!</Link>
          </IconButton>
          <IconButton color="inherit" aria-label="menu">
            {user.user._id ? (
              <span>
                <Link to="/" onClick={handleLogOut}>
                  Logout
                </Link>
              </span>
            ) : (
              <Link to="/login">Login/Register</Link>
            )}
          </IconButton>
        </Toolbar> */
}
