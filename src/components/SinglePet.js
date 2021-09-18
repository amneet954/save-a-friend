import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingSingleReport, petWasFound } from "../store";
import { Comment } from "./childComponents";
import { Redirect } from "react-router-dom";

const SinglePet = ({ match }) => {
  let [redirect, setRedirect] = useState(false);
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

  if (redirect === true) {
    return <Redirect to="/map" />;
  } else if (report.data) {
    return (
      <div>
        {report.data ? (
          <img
            src={`http://localhost:4000/report/pet/${id}/${report.data.file.filename}`}
            alt="recent"
            style={{ width: "500px" }}
          />
        ) : null}

        {report.data ? (
          <span>
            {user._id === report.data.query.userId &&
            report.data.query.found === "lost" ? (
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
            {report.data.query.found === "lost" ? (
              //FIND A WAY TO CHANGE THE LONGITUDE AND LATTITUDE TO FOCUS ON THE PET IF REDIRECT IS TRUE MAYBE?
              <button onClick={() => setRedirect(true)}>
                FIND ME ON THE MAP!
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
