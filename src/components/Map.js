import React, { useState, useRef, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { gettingFoundPetsType } from "../store";
import useSupercluster from "use-supercluster";
import { Button, Container, Grid } from "@material-ui/core";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import Brightness1Icon from "@material-ui/icons/Brightness1";
import { useHistory } from "react-router-dom";
import useStyles from "./style";
import { Redirect } from "react-router-dom";
let accessToken = process.env.REACT_APP_MAPBOX_API;

const Map = ({ match }) => {
  let history = useHistory();
  const classes = useStyles();

  let [zipCodes, setZipCodes] = useState({});
  const state = useSelector((state) => state);
  let { allReports, report } = state;

  const initalDispatch = async () => {
    window.scrollTo(0, 0);
    await dispatch(gettingFoundPetsType("lost"));
    let obj = {};
    for (let i = 0; i < allReports.length; i++) {
      let current = allReports[i];
      let { geo, petName, _id } = current;
      let { longitude, latitude } = geo;
      longitude = Number(longitude.toFixed(5));
      latitude = Number(latitude.toFixed(5));
      let value = `${longitude},${latitude}`;
      if (!obj[value]) obj[value] = [petName + " " + _id];
      else obj[value].push(petName + " " + _id);
    }
    setZipCodes(obj);
  };

  let [viewport, setViewport] = useState({
    width: "80vw",
    height: "75vh",
    latitude: report.data ? report.data.query.geo.latitude : 40.68421,
    longitude: report.data ? report.data.query.geo.longitude : -73.83163,
    zoom: 14,
  });

  let [notSwitched, setNotSwitched] = useState(true);

  const dispatch = useDispatch();
  const ObjSize = (obj) => {
    let size = 0;
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) size += 1;
    }
    return size;
  };

  useEffect(() => {
    if (Object.keys(zipCodes) < 1) initalDispatch();

    let objectSize = ObjSize(report);

    if (objectSize > 0) {
      let singleReport = "";
      if (report.data) singleReport = report.data.query.geo;
      else singleReport = report.geo;
      if (singleReport && notSwitched) {
        let longitude = singleReport.longitude;
        let latitude = singleReport.latitude;
        setViewport({ ...viewport, longitude, latitude });
        setNotSwitched(false);
      }
    } else {
      setNotSwitched(false);
    }
  });

  const handleViewportChange = (viewport) => {
    setViewport(viewport);
  };

  const mapRef = useRef();

  const points = allReports.map((report) => ({
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

  const [selectedObj, setSelectObj] = useState({});
  const [multSelectedObj, setMultObjs] = useState({});

  if (!report.data) {
    return <Redirect to="/reports" />;
  } else {
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
          attributionControl={false}
          className={classes.reactMap}
        >
          {clusters.map((cluster) => {
            let [longitude, latitude] = cluster.geometry.coordinates;
            longitude = Number(longitude.toFixed(5));
            latitude = Number(latitude.toFixed(5));
            const { cluster: isCluster, point_count: pointCount } =
              cluster.properties;

            if (isCluster) {
              return (
                <Marker
                  key={cluster.id}
                  latitude={latitude}
                  longitude={longitude}
                >
                  <Container
                    style={{
                      width: `${10 + (pointCount / points.length) * 20}px`,
                      height: `${10 + (pointCount / points.length) * 20}px`,
                    }}
                    onClick={() => {
                      setSelectObj({});
                      const expansionZoom =
                        supercluster.getClusterExpansionZoom(cluster.id);

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
                      let coords = cluster.geometry.coordinates;
                      let long = coords[0].toFixed(5).toString();
                      let lat = coords[1].toFixed(5).toString();

                      if (zipCodes[long + "," + lat]) {
                        let values = zipCodes[long + "," + lat];

                        let arrObj = {
                          names: values,
                          long: Number(long),
                          lat: Number(lat),
                        };

                        setMultObjs(arrObj);
                      }
                    }}
                  >
                    <Brightness1Icon fontSize="small" color="primary" />
                    <h3 className={classes.markerCount}>{pointCount}</h3>
                  </Container>
                </Marker>
              );
            }
            return (
              <Marker
                key={cluster.properties.crimeId}
                latitude={latitude}
                longitude={longitude}
              >
                <Container
                  onClick={() => {
                    setMultObjs({});
                    let long = cluster.geometry.coordinates[0]
                      .toFixed(5)
                      .toString();
                    let lat = cluster.geometry.coordinates[1]
                      .toFixed(5)
                      .toString();

                    if (zipCodes[long + "," + lat]) {
                      let value = zipCodes[long + "," + lat][0];
                      let lastIdx = value.indexOf(" ");
                      let name = value.slice(0, lastIdx);
                      let id = value.slice(lastIdx + 1);

                      setSelectObj({ id, name, long, lat });
                    }
                    setViewport({
                      width: "80vw",
                      height: "75vh",
                      latitude,
                      longitude,
                      zoom: 20,
                      transitionInterpolator: new FlyToInterpolator({
                        speed: 2,
                      }),
                      transitionDuration: "auto",
                    });
                  }}
                >
                  <Brightness1Icon fontSize="small" color="primary" />
                </Container>
              </Marker>
            );
          })}
          {multSelectedObj.names ? (
            <Popup
              latitude={Number(multSelectedObj.lat)}
              longitude={Number(multSelectedObj.long)}
              closeButton={false}
            >
              <Container>
                {multSelectedObj.names.map((value, idx) => {
                  let lastIdx = value.indexOf(" ");
                  let name = value.slice(0, lastIdx);
                  let id = value.slice(lastIdx + 1);
                  return (
                    <Container
                      className={classes.mapPopUp}
                      onClick={() => history.push(`/pet/${id}`)}
                    >
                      <Link
                        to={`/pet/${id}`}
                        className={classes.linkDecoration}
                      >
                        <h3 key={idx}>{name}</h3>
                      </Link>
                    </Container>
                  );
                })}
              </Container>
            </Popup>
          ) : null}

          {selectedObj.id ? (
            <Popup
              latitude={Number(selectedObj.lat)}
              longitude={Number(selectedObj.long)}
              closeButton={false}
            >
              <Link
                to={`/pet/${selectedObj.id}`}
                className={classes.linkDecoration}
              >
                <h2>{selectedObj.name}</h2>
              </Link>
            </Popup>
          ) : null}
        </ReactMapGL>

        <Grid container span>
          <Grid item xs={6} className={classes.cardContent}>
            <Button
              color="primary"
              type="submit"
              className={classes.reactMapButtons}
              onClick={() => {
                setSelectObj({});
                setMultObjs({});

                setViewport({
                  zoom: 10,
                  width: "80vw",
                  height: "75vh",
                  latitude: report.data
                    ? report.data.query.geo.latitude
                    : 40.68421,
                  longitude: report.data
                    ? report.data.query.geo.longitude
                    : -73.83163,
                });
              }}
            >
              Zoom Out
            </Button>
          </Grid>

          <Grid item xs={6} className={classes.cardContent}>
            <Button
              color="primary"
              type="submit"
              className={classes.reactMapButtons}
              onClick={() => {
                let singularPet = report.data;

                if (singularPet) {
                  history.push(`/pet/${singularPet.query._id}`);
                } else {
                  history.push(`/reports`);
                }
              }}
            >
              {report.data
                ? `Back to ${report.data.query.petName}'s page`
                : "Our Lost Friends"}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
};

export default Map;
