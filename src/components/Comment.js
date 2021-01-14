import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style/index.js";
import { Divider, Avatar, Grid, Paper } from "@material-ui/core";

const Comment = ({ allComments }) => {
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
    </div>
  );
};

export default Comment;
