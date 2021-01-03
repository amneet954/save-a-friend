import axios from "axios";

//Default State
const defaultReport = [];

//Action Type
const GET_REPORTS = "GET_REPORTS";

//Action Creator
const getAllReports = (report) => ({ type: GET_REPORTS, report });

//Thunk
export const gettingAllReports = (id) => async (dispatch) => {
  try {
    let response = await axios({
      method: "GET",
      withCredentials: true,
      url: `http://localhost:4000/report/${id}`,
    });
    let { data } = response;
    dispatch(getAllReports(data));
  } catch (error) {
    console.log(error);
  }
};

//Reducer
let allReports = (state = defaultReport, action) => {
  switch (action.type) {
    case GET_REPORTS:
      return [...action.report];
    default:
      return state;
  }
};

export default allReports;
