import axios from "axios";

//Initial State
const defaultUser = {};

//Action Types
const GET_USER = "GET_USER";
const REGISTER_USER = "REGISTER_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_INFO = "UPDATE_INFO";

//Action Creators
const getUser = (user) => ({ type: GET_USER, user });
const registerUser = (user) => ({ type: REGISTER_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateInfo = (user) => ({ type: UPDATE_INFO, user });

//Thunks
export const login = (username, password) => async (dispatch) => {
  try {
    let response = await axios({
      method: "POST",
      data: {
        username: username,
        password: password,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/login",
    });
    let { data } = response;
    dispatch(getUser(data));
  } catch (error) {
    console.log(error);
    dispatch(getUser({ error: error }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios({
      method: "DELETE",
      withCredentials: true,
      headers: { "Access-Control-Allow-Origin": "*" },
      url: "http://localhost:4000/auth/logout",
    });
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

export const me = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/auth/");
    const { data } = response;
    dispatch(getUser(data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const updatingUserInfo =
  (username, password, email, updateType) => async (dispatch) => {
    try {
      let response = await axios({
        method: "POST",
        data: {
          username,
          password,
          email,
          updateType,
        },
        withCredentials: true,
        url: "http://localhost:4000/auth/updateUserInfo",
      });
      let { data } = response;
      dispatch(updateInfo(data));
    } catch (error) {
      return dispatch(updateInfo({ error: error }));
    }
  };

export const register = (username, password, email) => async (dispatch) => {
  try {
    let response = await axios({
      method: "POST",
      data: {
        username: username,
        password: password,
        email: email,
      },
      withCredentials: true,
      url: "http://localhost:4000/auth/register",
    });
    let { data } = response;
    dispatch(registerUser(data));
  } catch (error) {
    return dispatch(registerUser({ error: error }));
  }
};

//Reducer
let userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REGISTER_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    case UPDATE_INFO:
      return action.user;
    default:
      return state;
  }
};
export default userReducer;
