import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  CreateReportForm,
  NavBar,
  Authentication,
  AllReports,
  Home,
  Map,
  SinglePet,
  ErrorPage,
} from "./components";
import { Typography, Container } from "@material-ui/core";

import useStyles from "./components/style";

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <a color="inherit" href="https://material-ui.com/">
        Your Website
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

//Make the Switch more modular

let routes = [
  { path: "/", component: Home },
  { path: "/login", component: Authentication },
  { path: "/reports", component: AllReports },
  { path: "/newReport", component: CreateReportForm },
  { path: "/map", component: Map },
  { path: "/pet/:id", component: SinglePet },
  { path: "*", component: ErrorPage },
];

const App = () => {
  const classes = useStyles();
  return (
    <BrowserRouter>
      <div>
        <NavBar />
        <main>
          <Switch>
            {routes.map((route) => (
              <Route exact path={route.path} component={route.component} />
            ))}
            {/* <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Authentication} />
            <Route exact path="/reports" component={AllReports} />
            <Route exact path="/newReport" component={CreateReportForm} />
            <Route exact path="/map" component={Map} />
            <Route exact path="/pet/:id" component={SinglePet} />
            <Route
              exact
              path="*"
              render={() => (
                <h1 className="text-center" id="front">
                  PAGE DOESN'T EXIST. PLEASE START AT THE 'WELCOME' LINK!
                </h1>
              )}
            /> */}
          </Switch>
        </main>
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>
            <Copyright />
          </Container>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
