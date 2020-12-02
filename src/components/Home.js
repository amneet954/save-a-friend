import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";

const Home = ({ user }) => {
  let username = user.user.username;
  console.log("HOME", user);
  return (
    <Container maxWidth="xs">
      {username ? (
        <h2>Welcome Back {username}</h2>
      ) : (
        <h2>Login to Continue...</h2>
      )}
    </Container>
  );
};

const mapState = (state) => {
  return {
    user: state,
  };
};

export default connect(mapState)(Home);
