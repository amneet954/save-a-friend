import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation } from "../store";
import { Button, Container, TextField } from "@material-ui/core";
import { Redirect } from "react-router-dom";
import useStyles from "./style/index.js";

const CreateReportForm = () => {
  let [petName, setPetName] = useState("");
  let [lastPlaceSeen, setLastPlace] = useState("");
  let [contactEmail, setContactEmail] = useState("");
  let [zipCode, setZipCode] = useState("");
  let [redirect, setRedirect] = useState(false);
  const user = useSelector((state) => state.user);
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { _id, username } = user;
  const classes = useStyles();

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState({});

  const createReport = async () => {
    if (!uploadedImage.name) alert("Image Upload Failed");
    let formData = new FormData();
    const userId = _id;
    formData.append("file", uploadedImage);
    formData.append("userId", userId);
    formData.append("petName", petName);
    formData.append("lastPlaceSeen", lastPlaceSeen);
    formData.append("contactEmail", contactEmail);
    formData.append("zipCode", zipCode);
    await dispatch(reportCreation(formData));
    setRedirect(true);
  };

  useEffect(() => {
    if (redirect === true) {
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
      label: "Last Seen",
      eventName: "lastPlaceSeen",
      type: "text",
      function: setLastPlace,
    },
    {
      value: zipCode,
      label: "Zip Code",
      eventName: "zipCode",
      type: "text",
      function: setZipCode,
    },
    {
      value: contactEmail,
      label: "Contact Email",
      eventName: "contactEmail",
      type: "email",
      function: setContactEmail,
    },
  ];
  console.log("ALL STATE: ", allState);
  console.log("USERNAME: ", user);
  if (redirect === true) {
    return <Redirect to="map" />;
  } else if (username) {
    return (
      <div>
        <h1 className={classes.title}>Hi {username}, let's save your pet!</h1>
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
                  <TextField
                    name={field.eventName}
                    type={field.type}
                    label={field.label}
                    value={field.value}
                    required
                    fullWidth
                    onChange={(event) => field.function(event.target.value)}
                    className={classes.textFieldCenter}
                  />
                  <br />
                </div>
              );
            })}
            <input
              className={classes.textFieldCenter}
              type="file"
              onChange={(event) => {
                setUploadedImageUrl(URL.createObjectURL(event.target.files[0]));
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
              style={{ width: "500px" }}
              alt=""
              className={classes.image}
            />
            <br />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.buttonCenter}
            >
              Submit
            </Button>
          </form>
        </Container>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Please login in or sign up to create report</h1>
      </div>
    );
  }
};

export default CreateReportForm;
