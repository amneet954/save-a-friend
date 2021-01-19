import axios from "axios";

//Default State
const defaultReport = [];

//Action Type
const GET_REPORTS = "GET_REPORTS";
const FOUND_OR_LOST = "FOUND_OR_LOST";
const LOCAL_ACTIVE_PETS = "LOCAL_ACTIVE_PETS";

//Action Creator
const getAllReports = (report) => ({ type: GET_REPORTS, report });
const getFoundOrLost = (petList) => ({ type: FOUND_OR_LOST, petList });
const getLocalActivePets = (localActivePets) => ({
  type: LOCAL_ACTIVE_PETS,
  localActivePets,
});
//Thunk

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

//Reducer
let allReports = (state = defaultReport, action) => {
  switch (action.type) {
    case GET_REPORTS:
      return [...action.report];
    case FOUND_OR_LOST:
      return [...action.petList];
    case LOCAL_ACTIVE_PETS:
      return [...action.localActivePets];
    default:
      return state;
  }
};

export default allReports;
