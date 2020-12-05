import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NavBar, Login, Home } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
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
