import axios from "axios";

//Initial State

let initialState = {};

//Action Types

const CREATE_COMMENT = "CREATE_COMMENT";

//Action Creators

const createComment = (comment) => ({ type: CREATE_COMMENT, comment });

//Thunk

export const creatingComment = (petCommentId, userId, content) => async (
  dispatch
) => {
  try {
    const response = await axios({
      method: "POST",
      baseURL: "http://localhost:4000/comment/",
      withCredentials: true,
      data: {
        petCommentId,
        userId,
        content,
      },
    });
    const { data } = response;
    dispatch(createComment(data));
  } catch (error) {
    console.log(error);
    dispatch(createComment({ error: error }));
  }
};

//Reducer

let commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_COMMENT:
      return action.comment;
    default:
      return state;
  }
};

export default commentReducer;
