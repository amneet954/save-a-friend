import axios from "axios";
const GET_REPORTS = "GET_REPORTS";

const defaultReport = [];
const getAllReports = (report) => ({ type: GET_REPORTS, report });

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

let allReportsReducer = (state = defaultReport, action) => {
  switch (action.type) {
    case GET_REPORTS:
      return [...action.report];
    default:
      return state;
  }
};

export default allReportsReducer;
