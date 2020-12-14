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
  let { user, report } = state;
  const dispatch = useDispatch();
  useEffect(() => dispatch(gettingAllReports(user._id)), []);

  let [viewPort, setViewPort] = useState({
    width: 400,
    height: 400,
    latitude: 40.68420971837575,
    longitude: -73.83163001900016,
    zoom: 14,
  });
  let [selectedPet, setSelectedPet] = useState("");

  const handleViewPortChange = (viewport) => {
    setViewPort(viewport);
  };
  const mapPopUp = (value) => {
    setSelectedPet(value);
  };
  const closeMapPopUp = () => {
    setSelectedPet("");
  };

  return (
    <div>
      <ReactMapGL
        {...viewPort}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => handleViewPortChange(viewport)}
      >
        {Object.entries(report).map(([key, value]) => {
          return (
            <Marker
              key={value._id}
              latitude={value.geo.latitude}
              longitude={value.geo.longitude}
            >
              <div onMouseEnter={() => mapPopUp(value)}>
                <Brightness1Icon fontSize="small" />
              </div>
            </Marker>
          );
        })}

        {selectedPet.geo ? (
          <Popup
            latitude={selectedPet.geo.latitude}
            longitude={selectedPet.geo.longitude}
            onClose={closeMapPopUp}
          >
            <div>
              <h2>{selectedPet.petName}</h2>
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};
export default Map;
