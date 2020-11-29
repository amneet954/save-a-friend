const Test = (props) => {
  let value = localStorage.getItem("user");

  return (
    <div>
      <h1>Hi</h1>
      {value ? <h1>Welcome Back {value}!!!!</h1> : null}
    </div>
  );
};

export default Test;
