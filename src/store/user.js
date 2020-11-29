import axios from "axios";

//ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";

//INITIAL STATE
const defaultUser = {};

//ACTION CREATORS
const getUser = (user) => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });

//THUNK CREATORS
export const me = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:4000/auth/");
    const { data } = response;
    dispatch(getUser(data || defaultUser));
  } catch (err) {
    console.error(err);
  }
};

export const auth = (username, password) => async (dispatch) => {
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
    console.log(data);
    dispatch(getUser(data));
  } catch (error) {
    return dispatch(getUser({ error: error }));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await axios.post("http://localhost:4000/auth/logout");
    dispatch(removeUser());
  } catch (err) {
    console.error(err);
  }
};

//REDUCER

let userReducer = (state = defaultUser, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    case REMOVE_USER:
      return defaultUser;
    default:
      return state;
  }
};
export default userReducer;
