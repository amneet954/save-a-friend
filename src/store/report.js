import axios from "axios";

//Action Types
const CREATE_REPORT = "CREATE_REPORT";
// const GET_REPORTS = "GET_REPORTS";

//Initial State
const defaultReport = {};

//Action Creators

const createReport = (report) => ({ type: CREATE_REPORT, report });
// const getAllReports = (report) => ({ type: GET_REPORTS, report });

//THUNK CREATOR

// export const gettingAllReports = (id) => async (dispatch) => {
//   try {
//     let response = await axios({
//       method: "GET",
//       withCredentials: true,
//       url: `http://localhost:4000/report/${id}`,
//     });
//     let { data } = response;
//     dispatch(getAllReports(data));
//   } catch (error) {
//     console.log(error);
//   }
// };

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
