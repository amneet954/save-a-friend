import { connect } from "react-redux";
import { Button, Container } from "@material-ui/core";
import { useSelector } from "react-redux";

const Home = () => {
  const user = useSelector((state) => state.user);
  const { username } = user;
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

export default Home;
