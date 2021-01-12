import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style/index.js";
import axios from "axios";
const Comment = ({ userId, report }) => {
  const [allComments, setAllComments] = useState([]);
  const getComments = async (userId) => {
    const response = await axios({
      method: "GET",
      withCredentials: true,
      baseURL: "http://localhost:4000/comment/5fcb1f6be50d881ab64001f3",
    });
    const { data } = response;
    setAllComments(data);
    console.log("Wake Up: ", data);
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div>
      <h1>Comment Section</h1>
      {userId ? (
        <span>
          {allComments.map((comment, idx) => {
            let time = comment.createdAt;
            let end = time.indexOf("T");
            time = time.slice(0, end);
            return (
              <span key={idx}>
                <h1>Content: {comment.content}</h1>
                <h3>Posted By: {comment.username} </h3>
                <h5>Date: {time}</h5>
              </span>
            );
          })}
        </span>
      ) : (
        <h1>Create a Comment here</h1>
      )}
    </div>
  );
};

export default Comment;
