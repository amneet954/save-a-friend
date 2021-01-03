import axios from "axios";

//Action Types
const CREATE_REPORT = "CREATE_REPORT";
const GET_REPORT = "GET_REPORT";

//Initial State
const defaultReport = {};

//Action Creators

const createReport = (report) => ({ type: CREATE_REPORT, report });
const getReport = (singleReport) => ({ type: GET_REPORT, singleReport });

//THUNK CREATOR

export const gettingSingleReport = (petId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: `http://localhost:4000/report/pet/${petId}`,
    });
    let { data } = response;
    dispatch(getReport(data));
  } catch (error) {
    console.log(error);
    dispatch(getReport({ error: error }));
  }
};

export const reportCreation = (formData) => async (dispatch) => {
  try {
    let response = await axios({
      method: "POST",
      data: formData,
      withCredentials: true,
      url: "http://localhost:4000/report/file",
    });
    let { data } = response;
    dispatch(createReport(data));
  } catch (error) {
    dispatch(createReport({ error: error }));
  }
};

//Reducer

let reportReducer = (state = defaultReport, action) => {
  switch (action.type) {
    case CREATE_REPORT:
      return action.report;
    case GET_REPORT:
      return action.singleReport;
    default:
      return state;
  }
};

export default reportReducer;
