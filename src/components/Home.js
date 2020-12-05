import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";

const Home = ({ user }) => {
  let username = user.user.username;
  console.log("HOME", user);
  return (
    <Container maxWidth="sm">
      {username ? (
        <div>
          <h2 style={{ textAlign: "center" }}>Welcome Back {username}</h2>
        </div>
      ) : (
        <h2 style={{ textAlign: "center" }}>Login to Continue...</h2>
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
