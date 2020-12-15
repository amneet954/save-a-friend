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
  let [zipCodes, setZipCodes] = useState({});

  useEffect(() => {
    const dispatchingReports = async () => {
      await dispatch(gettingAllReports(user._id));
      let obj = {};
      for (const [key, value] of Object.entries(report)) {
        let { petName, geo, lastPlaceSeen, _id } = value;
        if (obj[lastPlaceSeen])
          obj[lastPlaceSeen].petNames.push(petName + "," + _id);
        else {
          let { petName, geo, lastPlaceSeen, _id } = value;
          obj[lastPlaceSeen] = { geo, petNames: [petName + "," + _id] };
        }
      }

      await setZipCodes(obj);
    };
    dispatchingReports();
  }, []);

  let [viewport, setviewport] = useState({
    width: 400,
    height: 400,
    latitude: 40.68420971837575,
    longitude: -73.83163001900016,
    zoom: 14,
  });
  let [selectedPet, setSelectedPet] = useState("");

  const handleViewportChange = (viewport) => {
    setviewport(viewport);
  };
  const mapPopUp = (value) => {
    if (zipCodes[value.lastPlaceSeen]) {
      value.pets = zipCodes[value.lastPlaceSeen].petNames;
    }
    let obj = { geo: value.geo, pets: value.pets };
    setSelectedPet(obj);
  };
  const closeMapPopUp = () => {
    setSelectedPet("");
  };

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => handleViewportChange(viewport)}
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
              {selectedPet.pets.map((pet) => {
                let petName = pet.slice(0, pet.indexOf(","));
                let commaIdx = pet.indexOf(",") + 1;
                let id = pet.slice(commaIdx);
                console.log(id);
                return (
                  <div key={id}>
                    <h2>{petName}</h2>
                  </div>
                );
              })}
            </div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
