import React, { useEffect } from "react";
import { Container } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { gettingLocalActivePets } from "../store";

import { AllReportsLogic, GenericPage } from "./childComponents";

const Home = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { allReports } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(gettingLocalActivePets());
  }, []);
  let contentObj = { type: "Lost Pets in Your Area", pageInfo: "" };
  return (
    <Container>
      <GenericPage content={contentObj} />
      {allReports.length > 0 ? (
        <AllReportsLogic allReports={allReports} />
      ) : null}
    </Container>
  );
};

export default Home;
