import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar, Authentication, Home } from "./components";
// const loggedIn = localStorage.getItem("user");

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        {/* <NavBar {...{ loggedIn }} /> */}
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Authentication} />
            <Route
              exact
              path="*"
              render={() => (
                <h1 className="text-center" id="front">
                  PAGE DOESN'T EXIST. PLEASE START AT THE 'WELCOME' LINK!
                </h1>
              )}
            />
          </Switch>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
