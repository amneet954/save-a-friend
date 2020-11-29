import { connect } from "react-redux";
const Home = ({ user }) => {
  let username = user.user.username;
  return (
    <div>
      <h1>Hi</h1>
      {username ? <h1>Welcome Back {username}!!!!</h1> : null}
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state,
  };
};

export default connect(mapState)(Home);
