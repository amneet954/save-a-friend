import axios from "axios";

//Default State
const defaultReport = [];

//Action Type
const GET_REPORTS = "GET_REPORTS";
const FOUND_OR_LOST = "FOUND_OR_LOST";

//Action Creator
const getAllReports = (report) => ({ type: GET_REPORTS, report });
const getFoundOrLost = (petList) => ({ type: FOUND_OR_LOST, petList });

//Thunk

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
    default:
      return state;
  }
};

export default allReports;
