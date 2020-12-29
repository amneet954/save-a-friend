import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation, gettingAllReports } from "../store";
import { Button, Container } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const FileUpload = () => {
  const [imageObj, setImageObj] = useState({});
  const [petObj, setPetObj] = useState({});
  const getReport = async () => {
    const response = await axios({
      method: "GET",
      baseURL: "http://localhost:4000/report/pet/5fe8f4c34d70d512236a03b9",
    });

    // console.log(response);
    // console.log("data: ", response.data);
    setImageObj(response.data.file);
    setPetObj(response.data.query);
  };
  useEffect(() => {
    getReport();
  }, []);

  return (
    <div>
      <h1>hi</h1>
      <button onClick={() => console.log(petObj)}>test</button>
      {imageObj.filename ? (
        <img
          src={
            "http://localhost:4000/report/pet/5fe8f4c34d70d512236a03b9/" +
            imageObj.filename
          }
          alt="recent"
          style={{ width: "500px" }}
        />
      ) : null}
    </div>
  );
};

export default FileUpload;
