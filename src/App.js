import React, { useMemo } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  AboutUs,
  AllReports,
  Authentication,
  CreateReportForm,
  ErrorPage,
  FoundPets,
  Home,
  Map,
  // Navbar,
  SearchPage,
  SinglePet,
} from "./components";
import { Typography } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import useMediaQuery from "@mui/material/useMediaQuery";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import useStyles from "./components/style";
import Navbar from "./components/Navbar";

let routes = [
  { path: "/", component: Home },
  { path: "/login", component: Authentication },
  { path: "/search", component: SearchPage },
  { path: "/reports", component: AllReports },
  { path: "/newReport", component: CreateReportForm },
  { path: "/map", component: Map },
  { path: "/pet/:id", component: SinglePet },
  { path: "/foundFriends", component: FoundPets },
  { path: "/aboutUs", component: AboutUs },
  { path: "*", component: ErrorPage },
];

const App = () => {
  const classes = useStyles();
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
        typography: {
          fontFamily: [
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
        },
      }),
    [prefersDarkMode]
  );

  const Footer = () => {
    let currentYear = new Date().getFullYear();
    return (
      <Typography inline className={classes.footerTypography}>
        <p
          className={classes.footerText}
        >{`${currentYear} Save-A-Friend Org`}</p>
        <p className={classes.footerText}>{"Let's Connect"}</p>

        <a
          href="https://www.linkedin.com/in/amneet-sandhu/"
          className={classes.footerLink}
        >
          <LinkedInIcon className={classes.footerIcon} />
        </a>
      </Typography>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div>
          <Navbar />
          <main>
            <Switch>
              {routes.map((route, idx) => (
                <Route
                  key={idx}
                  exact
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Switch>
          </main>
        </div>
        <footer className={classes.footer}>
          <Footer />
        </footer>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
