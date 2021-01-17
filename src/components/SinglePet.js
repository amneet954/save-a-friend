import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingSingleReport, petWasFound } from "../store";
import { Comment } from "./childComponents";

const SinglePet = ({ match }) => {
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { report, user } = allState;
  const { id } = match.params;
  const [updated] = useState(false);

  const updateComments = () => {
    dispatch(gettingSingleReport(id));
  };

  useEffect(() => {
    dispatch(gettingSingleReport(id));
    // eslint-disable-next-line
  }, []);

  if (report.data) {
    return (
      <div>
        <h1>hi</h1>
        <button onClick={() => console.log(updated)}>test</button>
        <button> FIND ME ON THE MAP!</button>
        {report.data ? (
          <img
            src={`http://localhost:4000/report/pet/${id}/${report.data.file.filename}`}
            alt="recent"
            style={{ width: "500px" }}
          />
        ) : null}
        {report.data ? (
          <span>
            {user._id === report.data.query.userId ? (
              <button
                onClick={(event) => {
                  event.preventDefault();
                  let petId = report.data.query._id;
                  dispatch(petWasFound(petId));
                  console.log("from on click: ", petId);
                }}
              >
                Found Me?
              </button>
            ) : null}
          </span>
        ) : null}
        {report.commentData.length > 0 ? (
          <Comment
            allComments={report.commentData}
            petCommentId={report.data.query._id}
            userId={user._id}
            updateComments={updateComments}
          />
        ) : (
          <Comment
            allComments={report.commentData}
            petCommentId={report.data.query._id}
            userId={user._id}
            updateComments={updateComments}
          />
        )}
      </div>
    );
  } else {
    return null;
  }
};

export default SinglePet;
