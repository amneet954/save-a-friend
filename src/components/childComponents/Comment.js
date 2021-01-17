import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "../style/index.js";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";
import { Button, Container, TextField } from "@material-ui/core";
import { creatingComment } from "../../store";

const Comment = ({ allComments, petCommentId, userId, updateComments }) => {
  let helperText = "Write your comment here";
  const classes = useStyles();
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const createComment = async (petCommentId, userId, content, event) => {
    event.preventDefault();
    dispatch(creatingComment(petCommentId, userId, content));
    setContent("");
    updateComments();
  };
  return (
    <div>
      <h1>Comment Section</h1>
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
              <span>
                <Paper style={{ padding: "40px 20px" }}>
                  <Grid container wrap="nowrap" spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" />
                    </Grid>
                    <Grid justifyContent="left" item xs zeroMinWidth>
                      <h3 style={{ margin: 0, textAlign: "left" }}>
                        {comment.username}
                      </h3>
                      {/* <p style={{ textAlign: "left" }}>{comment.content}</p> */}
                      <p style={{ textAlign: "left" }}>{comment.content}</p>
                      <p style={{ textAlign: "left", color: "gray" }}>
                        Posted at: {firstTime} {AMorPM} EST
                      </p>
                    </Grid>
                  </Grid>
                </Paper>
              </span>
            );
          })}
        </span>
      ) : (
        <h1>Create a Comment here</h1>
      )}
      <form
        onSubmit={(event) => {
          createComment(petCommentId, userId, content, event);
        }}
      >
        <TextField
          type="text"
          fullWidth
          required
          value={content}
          helperText={helperText}
          onChange={(event) => setContent(event.target.value)}
        />
        <Button type="submit" variant="contained" color="primary">
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default Comment;
