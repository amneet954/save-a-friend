import React from "react";
import { GenericPage } from "./childComponents";

const ErrorPage = () => {
  let contentObj = {
    type: `404 Not Found`,
    pageInfo: "",
  };
  return <GenericPage content={contentObj} />;
};

export default ErrorPage;
