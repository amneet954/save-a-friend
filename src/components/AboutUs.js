import React from "react";
import { GenericPage } from "./childComponents";

let pageInfo = `"Save-A-Friend" is a group of people that far outnumbers the founders of this project(which would be just 1). Our goal is to create a large community that reaches beyond borders and places a focus on micro level in the everyday life. While a dog is typically considered man's best friend, we believe that every pet that belongs to a family, is a family member themselves and deserve to have the utmost attention brought on to them in the unfortunate event that they go missing. We believe that our local community members have the potential to become heroes!`;

const AboutUs = () => {
  let contentObj = { type: "About Us", pageInfo };
  return <GenericPage content={contentObj} />;
};

export default AboutUs;
