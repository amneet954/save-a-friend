import React, { useEffect } from "react";
import { gettingAllReports } from "../store";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import useStyles from "./style";

const AllReports = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const { user, allReports } = state;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(gettingAllReports(user._id));
    // eslint-disable-next-line
  }, []);

  if (!user._id) {
    return (
      <div className={classes.allReportsGridPadding}>
        <h1 className={classes.title}>
          Please log in to view your pet case reports
        </h1>
      </div>
    );
  } else {
    return (
      <div className={classes.allReportsGridPadding}>
        <h1 className={classes.title}>Hi from All Reports</h1>
        <div className={classes.allReportsGrid}>
          {allReports.map((pet, idx) => {
            return (
              <div key={idx}>
                <div className={classes.allReportsCell}>
                  <a href={`http://localhost:3000/pet/${pet._id}`}>
                    <img
                      src={`http://localhost:4000/report/pet/${pet._id}/${pet.petImageName}`}
                      alt="recent"
                      className={classes.allReportsIndividualImage}
                    />
                  </a>
                </div>
                <Link to={`/pet/${pet._id}`} className={classes.linkDecoration}>
                  <h4 className={classes.title}>{pet.petName}</h4>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default AllReports;
