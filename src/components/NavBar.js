import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store";
const NavBar = ({ user, handleLogOut }) => {
  return (
    <nav>
      <Link to="/">Welcome!</Link>
      {user.user._id ? (
        <span>
          <a href="#" onClick={handleLogOut}>
            Logout
          </a>
        </span>
      ) : (
        <Link to="/login">Login/Register</Link>
      )}
    </nav>
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
