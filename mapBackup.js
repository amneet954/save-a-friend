import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingAllReports } from "../store";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import Brightness1Icon from "@material-ui/icons/Brightness1";
let accessToken =
  "pk.eyJ1IjoiYW1uZWV0OTU0IiwiYSI6ImNqdjJpd215dzB5azIzeXFvZDMxbmk2ZDYifQ.FIIav70z0itM7EsJHAe_6A";

const Map = () => {
  const state = useSelector((state) => state);
  let { user, allReportsReducer } = state;
  const dispatch = useDispatch();
  let [selectedPet, setSelectedPet] = useState("");

  useEffect(() => {
    dispatch(gettingAllReports(user._id));
  }, []);

  let [viewport, setviewport] = useState({
    width: 1000,
    height: 1000,
    latitude: 40.68420971837575,
    longitude: -73.83163001900016,
    zoom: 8,
  });

  const handleViewportChange = (viewport) => {
    setviewport(viewport);
  };
  const mapPopUp = (oneReport) => {
    setSelectedPet(oneReport);
  };
  const closeMapPopUp = (geo) => {
    setSelectedPet("");
    let latitude = geo.latitude;
    let longitude = geo.longitude;
    setviewport({
      width: 400,
      height: 400,
      latitude,
      longitude,
      zoom: 8,
    });
  };
  const handlemapView = (geo) => {
    let latitude = geo.latitude;
    let longitude = geo.longitude;
    setviewport({
      width: 750,
      height: 750,
      latitude,
      longitude,
      zoom: 14,
    });
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => handleViewportChange(viewport)}
      >
        {allReportsReducer.map((singleReport, idx) => {
          return (
            <span onMouseEnter={() => mapPopUp(singleReport)}>
              <Marker
                key={"Marker" + idx}
                latitude={singleReport.geo.latitude}
                longitude={singleReport.geo.longitude}
                style={{ position: "relative" }}
              >
                <span onClick={() => handlemapView(singleReport.geo)}>
                  <Brightness1Icon fontSize="small" />
                </span>
              </Marker>
              {selectedPet.geo ? (
                <Popup
                  key={"PopUp" + idx}
                  latitude={selectedPet.geo.latitude}
                  longitude={selectedPet.geo.longitude}
                  onClose={() => closeMapPopUp(selectedPet.geo)}
                >
                  <h2>{selectedPet.petName}</h2>
                </Popup>
              ) : null}
            </span>
          );
        })}
      </ReactMapGL>
      {selectedPet.geo ? <h1>{selectedPet.petName}</h1> : null}
    </div>
  );
};

export default Map;
