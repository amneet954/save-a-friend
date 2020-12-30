import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  navbarTitle: {
    flexGrow: 1,
  },
  navBarLink: {
    textDecoration: "none",
    color: "white",
    paddingRight: "5%",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.25),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.35),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  },
  outSearchLayer: {
    paddingRight: "5%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  formCenter: {
    margin: "auto",
    width: "800px",
  },
  textFieldCenter: {
    width: "50%;",
    margin: "auto",
    display: "block",
  },
  buttonCenter: {
    margin: "auto",
    display: "block",
  },
  formControl: {
    margin: "auto",
    width: "50%;",
    display: "block",
  },
  title: { textAlign: "center" },
  image: {
    width: "500px",
    margin: "auto",
    display: "block",
  },
  footer: {
    padding: theme.spacing(3, 2),
    // marginTop: "auto",
    marginTop: "8%",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  loginButton: {
    textAlign: "center",
  },
}));

export default useStyles;
