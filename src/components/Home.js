import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";

const Home = ({ user }) => {
  let username = user.user.username;
  console.log("HOME", user);
  return (
    <Container maxWidth="sm">
      {username ? (
        <h2 style={{ "text-align": "center" }}>Welcome Back {username}</h2>
      ) : (
        <h2 style={{ "text-align": "center" }}>Login to Continue...</h2>
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
