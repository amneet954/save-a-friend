import axios from "axios";

//Action Types
const CREATE_REPORT = "CREATE_REPORT";

//Initial State
const defaultReport = {};

//Action Creators

const createReport = (report) => ({ type: CREATE_REPORT, report });

//THUNK CREATOR

export const reportCreation = (
  userId,
  petName,
  lastPlaceSeen,
  contactEmail,
  zipCode
) => async (dispatch) => {
  try {
    let response = await axios({
      method: "POST",
      data: {
        userId,
        petName,
        lastPlaceSeen,
        contactEmail,
        zipCode,
      },
      withCredentials: true,
      url: "http://localhost:4000/report/",
    });
    let { data } = response;
    dispatch(createReport(data));
  } catch (error) {
    return dispatch(createReport({ error: error }));
  }
};

//Reducer

let reportReducer = (state = defaultReport, action) => {
  switch (action.type) {
    case CREATE_REPORT:
      return action.report;
    default:
      return state;
  }
};

export default reportReducer;
