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
  accountButton: {
    marginRight: "1%",
    color: "white",
  },
  zoomOutButton: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    margin: "auto",
  },
  reactMapPlacement: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  linkDecoration: { textDecoration: "none", color: "black" },
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
    width: "500px",
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
    width: "25%",
    display: "inline-block;",
  },
  title: { textAlign: "center" },
  image: {
    width: "500px",
    margin: "auto",
    display: "block",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "8%",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
  loginButton: {
    textAlign: "center",
  },
  loginFields: {
    // display: "inline-block",
    // marginLeft: "30px",
    marginRight: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    margin: "auto",
    display: "inline-block",
    marginLeft: "30px",
  },
  allReportsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gridGap: "10%",
    gridAutoRows: "250px",
  },
  allReportsCell: {
    outlineStyle: "solid",
    textDecoration: "none",
  },
  allReportsIndividualImage: {
    maxWidth: "460px",
    maxHeight: "190px",
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
  },
  allReportsGridPadding: {
    paddingLeft: "20%",
    paddingRight: "20%",
  },
}));

export default useStyles;
