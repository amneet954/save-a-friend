const Test = (props) => {
  //   console.log(data);
  let value = localStorage.getItem("user");
  console.log("Value here: " + value);
  return (
    <div>
      <h1>Hi</h1>
      {value ? <h1>Welcome Back {value}!!!!</h1> : null}
    </div>
  );
};

export default Test;
