import { makeStyles } from "@material-ui/core/styles";

const prefersDarkMode = window.matchMedia(
  "(prefers-color-scheme: dark)"
).matches;

let backgroundColor = prefersDarkMode ? "#191919" : "#ffffff";
let textColor = prefersDarkMode ? "#ffffff" : "#2E3B55";

const useStyles = makeStyles((theme) => ({
  appBar: { background: backgroundColor },
  authGrid: {
    marginTop: "3%",
    paddingBottom: "3%",
    paddingLeft: "25%",
    paddingRight: "25%",
  },
  authPaper: {
    marginTop: "15%",
    marginLeft: "20%",
    marginRight: "20%",
    paddingBottom: "2%",
  },
  authPaperContainer: { paddingTop: "2%" },
  authFailureMessage: { paddingLeft: "33%", paddingRight: "33%" },
  authSecondaryButtons: {
    paddingBottom: "3%",
    paddingLeft: "3%",
    color: "white",
  },
  authSecondaryButtonContainer: { marginTop: "5%", marginLeft: "15%" },
  authText: { textAlign: "center" },
  authTextField: {
    marginTop: "1%",
    marginBottom: "1%",
    backgroundColor: "white",
  },
  authTextContainer: { paddingLeft: "20%", paddingRight: "20%" },
  buttonCenter: {
    margin: "auto",
    display: "block",
  },
  cardContent: { textAlign: "center" },
  comment: { padding: "40px 20px", backgroundColor: backgroundColor },
  commentButton: { marginTop: "2%", marginLeft: "40%" },
  commentContent: { textAlign: "left", color: textColor },
  commentField: { backgroundColor: "white" },
  commentItem: { marginBottom: "2%" },
  commentPostedAt: { textAlign: "left", color: "gray" },
  commentSubmit: {
    marginTop: "2%",
    paddingLeft: "10%",
    paddingRight: "10%",
    paddingBottom: "2%",
  },
  commentUnauth: {
    textAlign: "center",
    paddingTop: "1%",
    paddingBottom: "1%",
    color: textColor,
  },
  commentUsername: { margin: 0, textAlign: "left", color: textColor },
  footer: { marginTop: "calc(5% + 60px)", bottom: 0 },
  footerIcon: {
    display: "inline",
    margin: -5,
    marginLeft: "1%",
    marginTop: -7,
    fontSize: 30,
  },
  footerLink: { color: "inherit", display: "inline" },
  footerText: { display: "inline", marginLeft: "2%" },
  footerTypography: {
    marginTop: "2%",
    marginLeft: "10%",
    marginRight: "10%",
    paddingBottom: "2%",
  },
  gridContainer: { marginTop: "5%" },
  gridItem: {
    paddingBottom: "3%",
    paddingLeft: "3%",
  },
  gridPadding: {
    marginTop: "14%",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  image: {
    margin: "auto",
    display: "block",
    width: "100px",
  },
  linkDecoration: { textDecoration: "none", color: "black" },
  loginFields: {
    backgroundColor: "#FFFFFF",
    marginRight: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    margin: "auto",
    display: "inline-block",
    marginLeft: "30px",
  },

  mapContainer: {
    marginLeft: "38%",
    marginRight: "38%",
    marginTop: "8%",
    marginBottom: "4",
  },
  mapPopUp: { backgroundColor: "white" },
  mapRedirectButton: { marginLeft: "2%" },
  mapZoomOutButton: { marginRight: "2%" },
  markerCount: {
    color: "black",
  },
  navBarLink: {
    textDecoration: "none",
    marginLeft: "2%",
    marginRight: "2%",
    color: textColor,
  },
  navbarTitle: {
    flexGrow: 1,
  },
  navAuth: { color: textColor },
  outSearchLayer: {
    paddingLeft: "5%",
  },
  pageInfo: { padding: "4%", textAlign: "center", marginBottom: "2%" },
  paperCommentHeader: {
    background: backgroundColor,
    marginBottom: "5%",
    marginTop: "5%",
  },
  paperCommentTypography: {
    textAlign: "center",
    paddingTop: "1%",
    paddingBottom: "1%",
    color: textColor,
  },
  reportContainer: { padding: "4%", marginLeft: "10%", marginRight: "10%" },
  reportTextField: {
    backgroundColor: "#FFFFFF",
    marginTop: "1%",
    marginBottom: "2%",
  },
  singlePetBody: { marginTop: "2%", marginBottom: "3%", textAlign: "center" },
  singlePetDate: {},
  singlePetImage: { paddingLeft: "2%", paddingRight: "2%" },
  singlePetTitle: { textAlign: "center", paddingTop: "2%" },
  textFieldCenter: {
    width: "50%;",
    marginLeft: "33%",
    marginTop: "8%",
    display: "block",
  },
  title: { textAlign: "center" },
  titlePadding: {
    marginLeft: "25%",
    marginRight: "25%",
    textAlign: "center",
    marginTop: "16%",
    marginBottom: "6%",
  },
  uploadImage: { width: "500px" },
  whiteText: { color: "white" },
  zoomOutButton: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "2%",
    marginBottom: "2%",
    margin: "auto",
  },

  loginRegisterButton: {
    marginLeft: "auto",
    marginBottom: "1.75%",
    textDecoration: "none",
  },
  tabs: {
    marginLeft: "auto",
    // "&:hover": {
    //   background: backgroundColor,
    // },
    textDecoration: "none",
    color: textColor,
  },
  logoTabs: {
    textDecoration: "none",
  },
  tabsContainer: {
    marginLeft: "auto",
  },
  logoTabColor: {
    // "&:hover": {
    //   background: textColor,
    // },
    color: textColor,
    textDecoration: "none",
    marginRight: "-10",
  },
  icons: {
    fontSize: "1.4rem",
  },
  iconLogo: {
    color: "white",
  },
  navBarcolor: {
    backgroundColor: backgroundColor,
  },
  responsiveContainer: { marginLeft: "auto", backgroundColor },
  responsiveButtonContainer: { marginLeft: "auto", color: textColor },
  responsiveMenuIconToggle: { fontSize: "3rem", color: textColor },
  tabHeight: { minHeight: "75px", height: "75px" },
  reportFormTitles: { textAlign: "center" },
  reactMap: { marginTop: "10%", marginLeft: "10%" },
  reactMapButtons: { textDecoration: "none", color: "white" },
  navTabs: {
    display: "inline",
    marginRight: "1%",
    marginBottom: "-1%",
    textDecoration: "none",
  },
  navLightModeBar: { color: "#191919" },
  searchBarMargin: { marginLeft: "1%" },
  searchBarContainer: { marginTop: "10%" },
}));

export default useStyles;
