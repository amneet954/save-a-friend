import { BrowserRouter, Route, Switch } from "react-router-dom";
// import NavBar from "./components/NavBar";
import { NavBar, Authentication, Test } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" component={Test} />
            <Route exact path="/test" component={Authentication} />
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
