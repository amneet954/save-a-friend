import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";
import { useSelector } from "react-redux";
import useStyles from "./style";
const Home = () => {
  const classes = useStyles();
  const user = useSelector((state) => state.user);
  const { username } = user;
  return (
    <Container maxWidth="sm">
      {username ? (
        <div>
          <h2 className={classes.loginButton}>Welcome Back {username}</h2>
        </div>
      ) : (
        <h2 className={classes.loginButton}>Login to Continue...</h2>
      )}
    </Container>
  );
};

export default Home;
