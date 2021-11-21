import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingSingleReport, petWasFound } from "../store";
import { Comment } from "./childComponents";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardActions,
  CardMedia,
  Button,
  Typography,
  Paper,
} from "@mui/material/";
import { Grid } from "@material-ui/core/";
import useStyles from "./style";

const SinglePet = ({ match }) => {
  const classes = useStyles();
  let [redirect, setRedirect] = useState(false);
  let [petFoundRedirect, setPetFoundRedirect] = useState(false);
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const { report, user } = allState;
  const { id } = match.params;

  const updateComments = () => {
    dispatch(gettingSingleReport(id));
  };

  const foundPet = () => {
    dispatch(petWasFound(id));
    // history.push("/foundFriends");
    setPetFoundRedirect(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(gettingSingleReport(id));
    // eslint-disable-next-line
  }, []);

  if (redirect === true) {
    return <Redirect to="/map" />;
  } else if (petFoundRedirect === true) {
    <Redirect to="/" />;
  } else if (report.data) {
    let { commentData, data } = report;
    console.log("REPORT HERE:", report.commentData);
    return (
      <Grid className={classes.gridPadding}>
        <Paper>
          <Card>
            <Typography
              gutterBottom
              variant="h2"
              className={classes.singlePetTitle}
              component="div"
            >
              {data.petName}
            </Typography>

            <CardMedia
              className={classes.singlePetImage}
              component="img"
              alt="pet"
              height="500"
              // image={`http://localhost:4000/report/pet/${file._id}/${data.petImageName}`},
              image={`http://localhost:4000/file/${data.petImageName}`}
            />
            <span className={classes.singlePetBody}>
              <Typography
                display="block"
                variant="body1"
                color="text.secondary"
                className={classes.singlePetBody}
              >
                <strong> Date Lost: </strong>
                {data.createdAt}
              </Typography>
              <Typography
                display="block"
                variant="body1"
                color="text.secondary"
              >
                <strong>Last Place Seen:</strong> {data.lastPlaceSeen}
              </Typography>
            </span>
            <CardActions>
              <Button
                size="large"
                fullWidth="true"
                onClick={() => setRedirect(true)}
              >
                Find me on the map!
              </Button>
            </CardActions>
            {data.userId === user._id ? (
              <CardActions>
                <Button
                  size="large"
                  fullWidth="true"
                  onClick={() => foundPet()}
                >
                  Found Me?
                </Button>
              </CardActions>
            ) : null}
          </Card>
        </Paper>
        <br />
        {report.commentData.length > 0 ? (
          <Comment
            allComments={commentData}
            petCommentId={data._id}
            userId={user._id}
            updateComments={updateComments}
            petName={data.petName}
          />
        ) : (
          <Comment
            allComments={commentData}
            petCommentId={data._id}
            userId={user._id}
            updateComments={updateComments}
            petName={data.petName}
          />
        )}
      </Grid>
    );
  } else {
    return null;
  }
};

export default SinglePet;
