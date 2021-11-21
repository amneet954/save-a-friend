import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  List,
  ListItem,
  ListItemIcon,
  IconButton,
  ListItemText,
  makeStyles,
  Drawer,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router-dom";
import { Search } from "../childComponents";

const ResponsiveNavbar = ({ prefersDarkMode, unauthNavLinks, userID }) => {
  let history = useHistory();
  const state = useSelector((state) => state);
  const { user } = state;
  let backgroundColor = prefersDarkMode ? "#191919" : "#ffffff";
  let textColor = prefersDarkMode ? "#ffffff" : "#2E3B55";

  const [openDrawer, setOpenDrawer] = useState(false);

  const routeTo = (value) => {
    console.log(value);
    history.push(value);
  };

  const useStyles = makeStyles((theme) => ({
    responsiveContainer: { marginLeft: "auto", backgroundColor },
    responsiveMenuIconToggle: { fontSize: "3rem", color: textColor },
    responsiveBackgroundColor: { backgroundColor: textColor },
    listBackgroundColor: { backgroundColor },
    listColor: { color: textColor },
  }));

  let classes = useStyles();
  return (
    <>
      <span className={classes.responsiveBackgroundColor}>
        <Drawer
          anchor="right"
          classes={{ paper: classes.responsiveContainer }}
          onClose={() => setOpenDrawer(false)}
          open={openDrawer}
          onOpen={() => setOpenDrawer(true)}
        >
          <span className={classes.responsiveBackgroundColor}>
            <List className={classes.listBackgroundColor}>
              <ListItem>
                <Search setOpenDrawer={setOpenDrawer} />
              </ListItem>
              {unauthNavLinks.map((link, idx) => (
                <ListItem
                  divider
                  key={idx}
                  button
                  onClick={() => {
                    setOpenDrawer(false);
                    routeTo(link.link);
                  }}
                >
                  <ListItemIcon>
                    <ListItemText className={classes.listColor}>
                      {link.title}
                    </ListItemText>
                  </ListItemIcon>
                </ListItem>
              ))}
              <ListItem
                divider
                button
                onClick={() => {
                  setOpenDrawer(false);
                  routeTo("/login");
                }}
              >
                <ListItemIcon>
                  <ListItemText className={classes.listColor}>
                    {user._id ? "Log Out" : "Login/Register"}
                  </ListItemText>
                </ListItemIcon>
              </ListItem>
            </List>
          </span>
        </Drawer>
      </span>
      <IconButton
        className={classes.responsiveContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.responsiveMenuIconToggle} />
      </IconButton>
    </>
  );
};

export default ResponsiveNavbar;
