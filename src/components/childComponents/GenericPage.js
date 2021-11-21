import React, { useEffect } from "react";
import { Card } from "@mui/material/";
import { Container } from "@material-ui/core";
import useStyles from "../style";

const GenericPage = ({ content }) => {
  const classes = useStyles();
  console.log("CONTENT TYPE: ", content);

  let { type, pageInfo } = content;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Card className={classes.titlePadding}>
        <h2>{type}</h2>
      </Card>
      {pageInfo ? (
        <Card className={classes.pageInfo}>
          <h3>{pageInfo}</h3>
        </Card>
      ) : null}
    </Container>
  );
};

export default GenericPage;
