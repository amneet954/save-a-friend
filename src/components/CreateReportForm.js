import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { reportCreation } from "../store";
import { Button, Container } from "@material-ui/core";
import { Link } from "react-router-dom";

const CreateReportForm = () => {
  let [petName, setPetName] = useState("");
  let [lastPlaceSeen, setLastPlace] = useState("");
  let [contactEmail, setContactEmail] = useState("");
  let [zipCode, setZipCode] = useState("");

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { _id, username } = user;

  const createReport = (event) => {
    event.preventDefault();
    const userId = _id;
    dispatch(
      reportCreation(userId, petName, lastPlaceSeen, contactEmail, zipCode)
    );
  };

  if (username) {
    return (
      <div>
        <h1>Hi {username}, let's save your pet!</h1>
        <Container maxWidth="sm">
          <form onSubmit={createReport}>
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
