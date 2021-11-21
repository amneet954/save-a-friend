import React, { useEffect } from "react";
import { gettingFoundPetsType } from "../store";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import { AllReportsLogic, GenericPage } from "./childComponents";

const AllReports = () => {
  const state = useSelector((state) => state);
  const { allReports } = state;
  const dispatch = useDispatch();
  let contentObj = { type: "All Active Reports", pageInfo: "" };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(gettingFoundPetsType("lost"));
    sessionStorage.setItem("searchValue", "default");
  }, []);

  return (
    <Container>
      <GenericPage content={contentObj} />
      {allReports.length > 0 ? (
        <AllReportsLogic allReports={allReports} />
      ) : null}
    </Container>
  );
};

export default AllReports;
