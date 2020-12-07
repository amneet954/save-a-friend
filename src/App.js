import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  CreateReportForm,
  NavBar,
  Authentication,
  AllReports,
  Home,
  Map,
} from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Authentication} />
            <Route exact path="/reports" component={AllReports} />
            <Route exact path="/newReport" component={CreateReportForm} />
            <Route exact path="/map" component={Map} />
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
