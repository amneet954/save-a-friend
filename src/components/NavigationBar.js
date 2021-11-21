import React, { useState } from "react";
import { Link } from "react-router-dom";
import { logout } from "../store";
import { AppBar, Tabs, Tab, Toolbar } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style/index.js";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ResponsiveNavbar, Search } from "./childComponents/";
import PetsIcon from "@mui/icons-material/Pets";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import InfoIcon from "@mui/icons-material/Info";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import { createMuiTheme, responsiveFontSizes } from "@material-ui/core/styles";

const NavigationBar = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  let backgroundColor = prefersDarkMode ? "#191919" : "#ffffff";
  let textColor = prefersDarkMode ? "#ffffff" : "#2E3B55";

  let theme = createMuiTheme();
  theme = responsiveFontSizes(theme);

  const classes = useStyles();

  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const logOut = async () => await dispatch(logout());

  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const handleClickTab = (e, newValue) => {
    //The second value contains the current index
    setValue(newValue);
  };

  const unauthNavLinks = [
    {
      link: "/reports",
      title: "All Lost Friends",
      icon: <PetsIcon className={classes.icons} style={{ color: textColor }} />,
    },
    {
      link: "/foundFriends",
      title: "Community Accomplishments",
      icon: (
        <CheckCircleIcon
          className={classes.icons}
          style={{ color: textColor }}
        />
      ),
    },
    {
      link: "/newReport",
      title: "Create an Alert",
      icon: (
        <AnnouncementIcon
          className={classes.icons}
          style={{ color: textColor }}
        />
      ),
    },
    {
      link: "/aboutUs",
      title: "About Us",
      icon: <InfoIcon className={classes.icons} style={{ color: textColor }} />,
    },
  ];

  return (
    <AppBar elevation={0}>
      <Toolbar style={{ backgroundColor }}>
        <Link
          to="/"
          className={classes.logoTabColor}
          style={{ color: textColor }}
        >
          <Tab
            disableRipple
            label="Save A Friend"
            classes={{
              root: classes.tabHeight,
            }}
            className={classes.navTabs}
          />
        </Link>

        {isMatch ? (
          <>
            <ResponsiveNavbar
              userID={state.user._id}
              unauthNavLinks={unauthNavLinks}
              prefersDarkMode={prefersDarkMode}
            />
          </>
        ) : (
          <>
            <Tabs
              onChange={handleClickTab}
              className={classes.tabsContainer}
              classes={{
                root: classes.tabHeight,
              }}
              value={value}
              TabIndicatorProps={{
                style: { backgroundColor: backgroundColor },
              }}
            >
              {unauthNavLinks.map((link, idx) => (
                <Link
                  key={idx}
                  to={link.link}
                  className={classes.tabs}
                  style={{ color: textColor }}
                >
                  <Tab
                    classes={{
                      root: classes.tabHeight,
                    }}
                    disableRipple
                    icon={link.icon}
                    label={link.title}
                  />
                </Link>
              ))}
            </Tabs>

            <Search className={classes.searchBarMargin} />
            {state.user._id ? (
              <Link
                to="/"
                className={classes.loginRegisterButton}
                style={{ color: textColor }}
                onClick={logOut}
              >
                <Tab
                  classes={{
                    root: classes.tabHeight,
                  }}
                  disableRipple
                  icon={
                    <LogoutIcon
                      style={{ color: textColor, marginTop: "10%" }}
                      className={classes.icons}
                    />
                  }
                  label="Logout"
                />
              </Link>
            ) : (
              <Link
                to="/login"
                className={classes.loginRegisterButton}
                style={{ color: textColor }}
                onClick={() => sessionStorage.setItem("auth", "Login")}
              >
                <Tab
                  classes={{
                    root: classes.tabHeight,
                  }}
                  disableRipple
                  icon={
                    <LoginIcon
                      style={{ color: textColor, marginTop: "10%" }}
                      className={classes.icons}
                    />
                  }
                  label="Login/Register"
                />
              </Link>
            )}
          </>
        )}
      </Toolbar>
      {prefersDarkMode ? null : (
        <Box sx={{ borderBottom: 1 }} className={classes.navLightModeBar} />
      )}
    </AppBar>
  );
};

export default NavigationBar;
