import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  CreateReportForm,
  NavBar,
  Authentication,
  AllReports,
  Home,
  Map,
  SinglePet,
  FoundPets,
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

let routes = [
  { path: "/", component: Home },
  { path: "/login", component: Authentication },
  { path: "/reports", component: AllReports },
  { path: "/newReport", component: CreateReportForm },
  { path: "/map", component: Map },
  { path: "/pet/:id", component: SinglePet },
  { path: "/foundFriends", component: FoundPets },
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
