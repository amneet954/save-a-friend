import React from "react";
import useStyles from "../style";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@mui/material/";
import { Grid } from "@material-ui/core/";

const AllReportsLogic = ({ allReports }) => {
  const classes = useStyles();

  return (
    <Grid container span className={classes.gridContainer}>
      {allReports.map((pet, idx) => {
        console.log("PET:  ", pet);
        return (
          <Grid item xs={12} sm={4} key={idx} className={classes.gridItem}>
            <Card>
              <CardMedia
                component="img"
                alt="pet"
                height="200"
                image={`http://localhost:4000/file/${pet.petImageName}`}
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="div">
                  {pet.petName}
                </Typography>
              </CardContent>

              {pet.found === "lost" ? (
                <span>
                  <Typography
                    display="block"
                    variant="body2"
                    color="text.secondary"
                  >
                    Date Lost: {pet.createdAt}
                  </Typography>
                  <Typography
                    display="block"
                    variant="body2"
                    color="text.secondary"
                  >
                    Last Place Seen: {pet.lastPlaceSeen}
                  </Typography>

                  <CardActions>
                    <Button
                      size="small"
                      fullWidth="true"
                      href={`http://localhost:3000/pet/${pet._id}`}
                    >
                      Learn More
                    </Button>
                  </CardActions>
                </span>
              ) : null}
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default AllReportsLogic;
