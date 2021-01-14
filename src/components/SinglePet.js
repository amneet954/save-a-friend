import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingSingleReport } from "../store";
import axios from "axios";
import Comment from "./Comment";
const SinglePet = ({ match }) => {
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { report } = allState;
  const { id } = match.params;

  useEffect(() => {
    dispatch(gettingSingleReport(id));
    // eslint-disable-next-line
  }, []);
  console.log(report);

  if (report.data) {
    return (
      <div>
        <h1>hi</h1>
        <button onClick={() => console.log(report.data.query)}>test</button>

        {report.data ? (
          <img
            src={`http://localhost:4000/report/pet/${id}/${report.data.file.filename}`}
            alt="recent"
            style={{ width: "500px" }}
          />
        ) : null}

        {report.commentData.length > 0 ? (
          <Comment allComments={report.commentData} />
        ) : (
          <h1>No Comments to Display</h1>
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default SinglePet;
