import axios from "axios";

//Initial State
const defaultReport = [];

//Action Types
const FOUND_OR_LOST = "FOUND_OR_LOST";
const GET_REPORTS = "GET_REPORTS";
const GET_SEARCH_RESULTS = "GET_SEARCH_RESULTS";
const LOCAL_ACTIVE_PETS = "LOCAL_ACTIVE_PETS";

//Action Creators
const getAllReports = (report) => ({ type: GET_REPORTS, report });
const getFoundOrLost = (petList) => ({ type: FOUND_OR_LOST, petList });
const getLocalActivePets = (localActivePets) => ({
  type: LOCAL_ACTIVE_PETS,
  localActivePets,
});
const getSearchResults = (searchResults) => ({
  type: GET_SEARCH_RESULTS,
  searchResults,
});

//Thunks
export const gettingAllReports = () => async (dispatch) => {
  try {
    let response = await axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/report/`,
    });
    let { data } = response;
    dispatch(getAllReports(data));
  } catch (error) {
    console.log({ Error: error });
  }
};

export const gettingFoundPetsType = (truthy) => async (dispatch) => {
  try {
    let response = await axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/report/foundPets/${truthy}`,
    });
    let { data } = response;
    dispatch(getFoundOrLost(data));
  } catch (error) {
    console.log({ Error: error });
  }
};

export const gettingLocalActivePets = () => async (dispatch) => {
  try {
    let response = await axios({
      method: "GET",
      withCredentials: true,
      baseURL: `http://localhost:4000/report/homePage`,
    });
    let { data } = response;
    console.log(response);
    dispatch(getLocalActivePets(data));
  } catch (error) {
    console.log({ Error: error });
  }
};

export const gettingSearchResults = (searchValue) => async (dispatch) => {
  try {
    let response = await axios({
      method: "GET",
      withCredentials: true,
      baseURL: `http://localhost:4000/report/search/${searchValue}`,
    });
    let { data } = response;
    dispatch(getSearchResults(data));
  } catch (error) {
    console.log({ Error: error });
  }
};

//Reducer
let allReports = (state = defaultReport, action) => {
  switch (action.type) {
    case FOUND_OR_LOST:
      return [...action.petList];
    case GET_REPORTS:
      return [...action.report];
    case GET_SEARCH_RESULTS:
      return [...action.searchResults];
    case LOCAL_ACTIVE_PETS:
      return [...action.localActivePets];
    default:
      return state;
  }
};

export default allReports;
