import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useStyles from "../style/index.js";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Button, TextField } from "@material-ui/core";
import { Typography } from "@mui/material/";
import { creatingComment } from "../../store";

const Comment = ({
  allComments,
  petName,
  petCommentId,
  userId,
  updateComments,
}) => {
  let helperText = "Write your comment here";
  const classes = useStyles();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  const createComment = async (petCommentId, userId, content, event) => {
    event.preventDefault();
    await dispatch(creatingComment(petCommentId, userId, content, petName));
    setContent("");
    updateComments();
  };

  let commentTitle =
    allComments.length > 0 ? "Recent Updates" : `Help Us Find a Friend`;

  return (
    <Paper className={classes.paperCommentHeader}>
      <Typography
        gutterBottom
        variant="body1"
        className={classes.paperCommentTypography}
        component="div"
      >
        {commentTitle}
      </Typography>
      <Divider />
      {allComments.length > 0 ? (
        <span>
          {allComments.map((comment, idx) => {
            let time = comment.createdAt;
            let index = time.lastIndexOf(":");
            let firstTime = time.slice(0, index);
            let lastIdx = time.lastIndexOf(" ") + 1;
            let AMorPM = time.slice(lastIdx);
            return (
              <span className={classes.commentItem}>
                <Paper className={classes.comment}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Profile Pic" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h3 className={classes.commentUsername}>
                        {comment.username}
                      </h3>
                      <p className={classes.commentContent}>
                        {comment.content}
                      </p>
                      <p className={classes.commentPostedAt}>
                        Posted at: {firstTime} {AMorPM} EST
                      </p>
                    </Grid>
                  </Grid>
                </Paper>
              </span>
            );
          })}
        </span>
      ) : null}
      {userId ? (
        <form
          onSubmit={(event) => {
            createComment(petCommentId, userId, content, event);
            setContent("");
          }}
          className={classes.commentSubmit}
        >
          <TextField
            fullWidth
            required
            label={helperText}
            variant="filled"
            onChange={(event) => setContent(event.target.value)}
            className={classes.commentField}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.commentButton}
          >
            Post Comment
          </Button>
        </form>
      ) : (
        <Typography
          gutterBottom
          variant="body1"
          className={classes.commentUnauth}
          component="div"
        >
          Sign Up/Login to get involved in the conversation!
        </Typography>
      )}
    </Paper>
  );
};

export default Comment;
