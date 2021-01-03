import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingSingleReport } from "../store";

const SinglePet = ({ match }) => {
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { report } = allState;
  const { id } = match.params;

  useEffect(() => {
    dispatch(gettingSingleReport(id));
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <h1>hi</h1>
      <button onClick={() => console.log(report.query)}>test</button>
      {report.file ? (
        <img
          src={`http://localhost:4000/report/pet/${id}/${report.file.filename}`}
          alt="recent"
          style={{ width: "500px" }}
        />
      ) : null}
    </div>
  );
};

export default SinglePet;
