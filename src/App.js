import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  CreateReportForm,
  NavBar,
  Authentication,
  AllReports,
  Home,
  Map,
  FileUpload,
} from "./components";
import { Typography, Container } from "@material-ui/core";
import { makeStyles, fade } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    // marginTop: "auto",
    marginTop: "8%",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};
const App = () => {
  const classes = useStyles();
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
            <Route exact path="/fileUpload" component={FileUpload} />
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
