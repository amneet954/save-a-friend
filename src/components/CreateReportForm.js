import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation } from "../store";
import { Button, Container, TextField } from "@material-ui/core";
import Paper from "@mui/material/Paper";
import { Redirect } from "react-router-dom";
import useStyles from "./style/index.js";
import { GenericPage } from "./childComponents";

const CreateReportForm = () => {
  let [petName, setPetName] = useState("");
  let [lastPlaceSeen, setLastPlace] = useState("");
  let [redirect, setRedirect] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { _id, username, email } = user;
  const classes = useStyles();

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState({});

  const createReport = async () => {
    if (!uploadedImage.name) alert("Image Upload Failed");
    let formData = new FormData();
    const userId = _id;
    const contactEmail = email;
    formData.append("file", uploadedImage);
    formData.append("userId", userId);
    formData.append("username", username);
    formData.append("contactEmail", contactEmail);
    formData.append("petName", petName);
    formData.append("lastPlaceSeen", lastPlaceSeen);
    await dispatch(reportCreation(formData));
    setRedirect(true);
  };

  useEffect(() => {
    if (redirect === true) {
      window.scrollTo(0, 0);
      setRedirect(false);
    }
  }, []);

  const fields = [
    {
      value: petName,
      label: "Pet's Name",
      eventName: "petName",
      type: "text",
      function: setPetName,
    },
    {
      value: lastPlaceSeen,
      label: "Enter Complete Address Here",
      eventName: "lastPlaceSeen",
      type: "text",
      function: setLastPlace,
    },
  ];

  let contentObj = {
    type: `Hi ${username}, let's save your pet!`,
    pageInfo: "",
  };

  if (redirect === true) {
    return <Redirect to="/map" />;
  } else if (username) {
    return (
      <Container>
        <GenericPage content={contentObj} />
        <Paper className={classes.reportContainer}>
          <Container maxWidth="sm">
            <form
              onSubmit={(event) => {
                event.preventDefault();
                createReport();
                <Redirect to="/map" />;
              }}
            >
              {fields.map((field, idx) => {
                return (
                  <div key={idx}>
                    <h4 className={classes.reportFormTitles}>{field.label}:</h4>
                    <TextField
                      variant="filled"
                      name={field.eventName}
                      type={field.type}
                      value={field.value}
                      required
                      fullWidth
                      onChange={(event) => field.function(event.target.value)}
                      className={classes.reportTextField}
                    />
                    <br />
                  </div>
                );
              })}
              <input
                className={classes.textFieldCenter}
                type="file"
                onChange={(event) => {
                  setUploadedImageUrl(
                    URL.createObjectURL(event.target.files[0])
                  );
                  setUploadedImage(event.target.files[0]);
                }}
              />
              <br />
              <img
                src={
                  !uploadedImageUrl.trim()
                    ? "Please Upload an Image"
                    : uploadedImageUrl
                }
                alt="Upload"
                className={classes.image}
              />
              <br />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.buttonCenter}
              >
                Create a Lost Pet Post
              </Button>
            </form>
          </Container>
        </Paper>
      </Container>
    );
  } else {
    return <Redirect to="login" />;
  }
};

export default CreateReportForm;
