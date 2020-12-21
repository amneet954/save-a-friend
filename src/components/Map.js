import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingAllReports } from "../store";
import useSupercluster from "use-supercluster";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import { initialize } from "passport";
let accessToken =
  "pk.eyJ1IjoiYW1uZWV0OTU0IiwiYSI6ImNqdjJpd215dzB5azIzeXFvZDMxbmk2ZDYifQ.FIIav70z0itM7EsJHAe_6A";

const Map = () => {
  let [zipCodes, setZipCodes] = useState({});
  const state = useSelector((state) => state);
  let { user, allReportsReducer } = state;

  const initalDispatch = async () => {
    await dispatch(gettingAllReports(user._id));

    let obj = {};

    for (let i = 0; i < allReportsReducer.length; i++) {
      let current = allReportsReducer[i];
      let { geo, petName } = current;
      let { longitude, latitude } = geo;
      longitude = Number(longitude.toFixed(6));
      latitude = Number(latitude.toFixed(6));
      let value = `${longitude},${latitude}`;

      if (!obj[value]) obj[value] = [petName];
      else obj[value].push(petName);
    }
    setZipCodes(obj);
  };

  useEffect(() => {
    initalDispatch();
  }, []);

  const dispatch = useDispatch();

  let [viewport, setViewport] = useState({
    width: 750,
    height: 750,
    latitude: 40.68420971837575,
    longitude: -73.83163001900016,
    zoom: 8,
  });
  // let [viewport, setViewport] = useState({
  //   width: "100vw",
  //   height: "100vh",
  //   latitude: 40.68420971837575,
  //   longitude: -73.83163001900016,
  //   zoom: 8,
  // });
  const handleViewportChange = (viewport) => {
    setViewport(viewport);
  };

  const mapRef = useRef();

  const points = allReportsReducer.map((report) => ({
    type: "Feature",
    properties: {
      cluster: false,
      crimeId: report._id,
      category: "pet search",
    },
    geometry: {
      type: "Point",
      coordinates: [
        parseFloat(report.geo.longitude),
        parseFloat(report.geo.latitude),
      ],
    },
  }));

  const bounds = mapRef.current
    ? mapRef.current.getMap().getBounds().toArray().flat()
    : null;

  const { clusters, supercluster } = useSupercluster({
    points,
    zoom: viewport.zoom,
    bounds,
    options: { radius: 75, maxZoom: 20 },
  });

  return (
    <div>
      <ReactMapGL
        {...viewport}
        minZoom={5}
        maxZoom={20}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => handleViewportChange(viewport)}
        ref={mapRef}
      >
        {clusters.map((cluster) => {
          let [longitude, latitude] = cluster.geometry.coordinates;
          longitude = Number(longitude.toFixed(6));
          latitude = Number(latitude.toFixed(6));
          const {
            cluster: isCluster,
            point_count: pointCount,
          } = cluster.properties;

          if (isCluster) {
            return (
              <Marker
                key={cluster.id}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  style={{
                    width: `${10 + (pointCount / points.length) * 20}px`,
                    height: `${10 + (pointCount / points.length) * 20}px`,
                  }}
                  onClick={() => {
                    const expansionZoom = supercluster.getClusterExpansionZoom(
                      cluster.id
                    );

                    setViewport({
                      ...viewport,
                      latitude,
                      longitude,
                      zoom: expansionZoom,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  {zipCodes[`${longitude},${latitude}`] && viewport.zoom > 15
                    ? zipCodes[`${longitude},${latitude}`].map((value) => (
                        <h1>{value}</h1>
                      ))
                    : null}
                  <Brightness1Icon fontSize="small" />
                  {pointCount}
                </div>
              </Marker>
            );
          }
          return (
            <Marker
              key={cluster.properties.crimeId}
              latitude={latitude}
              longitude={longitude}
            >
              <div onClick={() => console.log(cluster.geometry)}>
                <Brightness1Icon fontSize="small" />
              </div>
            </Marker>
          );
        })}
      </ReactMapGL>
    </div>
  );
};

export default Map;
