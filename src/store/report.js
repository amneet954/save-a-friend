import axios from "axios";

//Initial State
const defaultReport = {};

//Action Types
const CREATE_REPORT = "CREATE_REPORT";
const FOUND_PET = "FOUND_PET";
const GET_REPORT = "GET_REPORT";

//Action Creators
const createReport = (report) => ({ type: CREATE_REPORT, report });
const foundPet = (foundPet) => ({ type: FOUND_PET, foundPet });
const getReport = (singleReport) => ({ type: GET_REPORT, singleReport });

//Thunks
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

export const reportCreation = (formData) => async (dispatch) => {
  try {
    let userId = formData.get("userId");
    let petName = formData.get("petName");
    console.log("FORM DATA: ", userId, petName);
    let response = await axios({
      method: "POST",
      data: formData,
      withCredentials: true,
      url: `http://localhost:4000/report/upload?fileID=${userId}${petName}`,
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
    case FOUND_PET:
      return action.foundPet;
    case GET_REPORT:
      return action.singleReport;
    default:
      return state;
  }
};

export default reportReducer;
