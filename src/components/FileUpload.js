import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation, gettingAllReports } from "../store";
import { Button, Container } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const FileUpload = () => {
  const [imageObj, setImageObj] = useState({});
  const getReport = async () => {
    const response = await axios({
      method: "GET",
      baseURL: "http://localhost:4000/report/test",
    });

    console.log(response);
    console.log("IMAGE: ", response.data.file);
    setImageObj(response.data.file);
  };
  useEffect(() => {
    getReport();
  }, []);
  return (
    <div>
      <h1>hi</h1>
      <button onClick={() => console.log(imageObj)}>test</button>
      {imageObj.filename ? (
        <img
          src={"http://localhost:4000/report/test/" + imageObj.filename}
          alt="recent"
          style={{ width: "500px" }}
        />
      ) : null}
    </div>
  );
};

export default FileUpload;
