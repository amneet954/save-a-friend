import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useStyles from "../style";

const AllReportsLogic = ({ allReports }) => {
  const classes = useStyles();
  return (
    <div className={classes.allReportsGridPadding}>
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
};

export default AllReportsLogic;
