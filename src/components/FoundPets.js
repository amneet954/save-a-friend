import React, { useEffect } from "react";
import { gettingFoundPetsType } from "../store";

import { useSelector, useDispatch } from "react-redux";

import { AllReportsLogic, GenericPage } from "./childComponents";
import { Container } from "@material-ui/core";

const FoundPets = () => {
  const state = useSelector((state) => state);
  const { allReports } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(gettingFoundPetsType("found"));
  }, []);

  let pageInfo =
    "We present to you,  our wall of success. Every pet in shown below, has been a family member that went missing at some point in time. Our community of friends worked together tirelessly to help everyone find their pet.  With this wall of success, we hope to comfort and assure newcomers that their pet can be rescued!";
  let contentObj = { type: "All Found Pets", pageInfo };

  return (
    <Container>
      <GenericPage content={contentObj} />

      {allReports.length > 0 ? (
        <AllReportsLogic allReports={allReports} />
      ) : null}
    </Container>
  );
};

export default FoundPets;
