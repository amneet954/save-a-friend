import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation, gettingAllReports } from "../store";
import { Button, Container } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  formCenter: {
    margin: "auto",
    width: "800px",
  },
  textFieldCenter: {
    width: "50%;",
    margin: "auto",
    display: "block",
  },
  buttonCenter: {
    margin: "auto",
    display: "block",
  },
  formControl: {
    margin: "auto",
    width: "50%;",
    display: "block",
  },
  title: { textAlign: "center" },
}));
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
    // alert("Report Sucessfully Created");
    // // dispatch(gettingAllReports(userId));
    // setRedirect(true);
  };
  //report.file.filename

  useEffect(() => {
    if (redirect === true) {
      setRedirect(false);
    }
  }, []);

  // const uploadImage = async () => {
  //   try {
  //     if (!uploadedImage.name) alert("Image Upload Failed");

  //     let formData = new FormData();
  //     formData.append("file", uploadedImage);
  //     const userId = _id;
  //     formData.append("userId", userId);
  //     formData.append("petName", petName);
  //     formData.append("lastPlaceSeen", lastPlaceSeen);
  //     formData.append("contactEmail", contactEmail);
  //     formData.append("zipCode", zipCode);
  //     // console.log("Form Data: ", formData.get("file"));
  //     // console.log("UserID:  ", formData.get("userId"));
  //     axios
  //       .post("http://localhost:4000/report/file", formData)
  //       .then((response) => {
  //         console.log("RESPONSE: ", response);
  //         response.data.success
  //           ? alert("File successfully uploaded")
  //           : alert("File already exists");
  //         // this.fetchRecent();
  //       })
  //       .catch((err) => alert("Error: " + err));
  //   } catch (error) {
  //     console.log("Error: ", error);
  //   }
  // };

  const fields = [
    {
      value: "Pet's Name",
      eventName: "petName",
      type: "text",
      function: setPetName,
    },
    {
      value: "Last Seen",
      eventName: "lastPlaceSeen",
      type: "text",
      function: setLastPlace,
    },
    {
      value: "ZipCode",
      eventName: "zipCode",
      type: "text",
      function: setZipCode,
    },
    {
      value: "Contact Email Address",
      eventName: "contactEmail",
      type: "email",
      function: setContactEmail,
    },
  ];

  if (redirect === true) {
    return <Redirect to="map" />;
  } else if (username) {
    // console.log(allState);
    return (
      <div>
        <h1>Hi {username}, let's save your pet!</h1>
        <Container maxWidth="sm">
          <form
            onSubmit={(event) => {
              event.preventDefault();
              createReport();
              <Redirect to="/map" />;
            }}
          >
            <div>
              <label htmlFor="Pet's Name">Pet's name: </label>
              <input
                name="petName"
                onChange={(event) => setPetName(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="Last Seen">Last Seen: </label>
              <input
                name="lastPlaceSeen"
                onChange={(event) => setLastPlace(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="Zip Code">Zip Code: </label>
              <input
                name="zipCode"
                onChange={(event) => setZipCode(event.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="Contact Email Address">
                Contact Email Address:{" "}
              </label>
              <input
                name="contactEmail"
                onChange={(event) => setContactEmail(event.target.value)}
                required
              />
            </div>
            <input
              type="file"
              onChange={(event) => {
                setUploadedImageUrl(URL.createObjectURL(event.target.files[0]));
                setUploadedImage(event.target.files[0]);
              }}
            />
            <img
              src={
                !uploadedImageUrl.trim()
                  ? "Please Upload an Image"
                  : uploadedImageUrl
              }
              style={{ width: "500px" }}
              alt="upload"
            />
            <Button
              type="submit"
              color="inherit"
              style={{
                color: "white",
                backgroundColor: "#00e600",
              }}
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
