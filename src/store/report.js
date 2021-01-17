import axios from "axios";

//Action Types
const CREATE_REPORT = "CREATE_REPORT";
const GET_REPORT = "GET_REPORT";
const FOUND_PET = "FOUND_PET";

//Initial State
const defaultReport = {};

//Action Creators

const createReport = (report) => ({ type: CREATE_REPORT, report });
const getReport = (singleReport) => ({ type: GET_REPORT, singleReport });
const foundPet = (foundPet) => ({ type: FOUND_PET, foundPet });

//THUNK CREATOR

export const petWasFound = (petId) => async (dispatch) => {
  try {
    await axios({
      method: "PUT",
      baseURL: `http://localhost:4000/report/pet/found/${petId}`,
      withCredentials: true,
    });

    const response = await axios({
      method: "GET",
      baseURL: `http://localhost:4000/report/pet/${petId}`,
    });
    let { data } = response;

    let commentReponse = await axios({
      method: "GET",
      withCredentials: true,
      baseURL: `http://localhost:4000/comment/${petId}`,
    });
    let commentData = commentReponse.data;

    dispatch(foundPet({ data, commentData }));
  } catch (error) {
    console.log(error);
  }
};

export const gettingSingleReport = (petId) => async (dispatch) => {
  try {
    const response = await axios({
      method: "GET",
      baseURL: `http://localhost:4000/report/pet/${petId}`,
    });
    let { data } = response;

    let commentReponse = await axios({
      method: "GET",
      withCredentials: true,
      baseURL: `http://localhost:4000/comment/${petId}`,
    });
    let commentData = commentReponse.data;

    dispatch(getReport({ data, commentData }));
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
    case FOUND_PET:
      return action.foundPet;
    default:
      return state;
  }
};

export default reportReducer;
