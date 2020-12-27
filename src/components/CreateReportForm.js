import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation, gettingAllReports } from "../store";
import { Button, Container } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";

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

  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [uploadedImage, setUploadedImage] = useState({});

  const createReport = async () => {
    const userId = _id;
    await dispatch(
      reportCreation(userId, petName, lastPlaceSeen, contactEmail, zipCode)
    );
    alert("Report Sucessfully Created");
    // dispatch(gettingAllReports(userId));
    setRedirect(true);
  };

  useEffect(() => {
    if (redirect === true) {
      setRedirect(false);
    }
  }, []);

  const uploadImage = async () => {
    try {
      if (!uploadedImage.name) alert("Image Upload Failed");

      let formData = new FormData();
      formData.append("file", uploadedImage);
      console.log("Form Data: ", formData.get("file"));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

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
            <button onClick={uploadImage}>Test Image State</button>
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
