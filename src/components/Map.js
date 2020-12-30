import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { gettingAllReports } from "../store";
import useSupercluster from "use-supercluster";
import ReactMapGL, { Marker, FlyToInterpolator, Popup } from "react-map-gl";
import { Link, Redirect } from "react-router-dom";
import Brightness1Icon from "@material-ui/icons/Brightness1";
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
      let { geo, petName, _id } = current;
      let { longitude, latitude } = geo;
      longitude = Number(longitude.toFixed(6));
      latitude = Number(latitude.toFixed(6));
      let value = `${longitude},${latitude}`;
      if (!obj[value]) obj[value] = [petName + " " + _id];
      else obj[value].push(petName + " " + _id);
    }
    setZipCodes(obj);
  };

  useEffect(() => {
    if (Object.keys(zipCodes) < 1) initalDispatch();
  });

  const dispatch = useDispatch();

  let [viewport, setViewport] = useState({
    width: 750,
    height: 750,
    latitude: 40.68421,
    longitude: -73.83163,
    zoom: 8,
  });
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

  const [selectedObj, setSelectObj] = useState({});
  const [multSelectedObj, setMultObjs] = useState({});

  return (
    <div>
      <button
        onClick={() => {
          setSelectObj({});
          setMultObjs({});
          setViewport({
            zoom: 8,
            width: 750,
            height: 750,
            latitude: 40.68421,
            longitude: -73.83163,
          });
        }}
      >
        Zoom Out
      </button>
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
                    setSelectObj({});
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
                    let coords = cluster.geometry.coordinates;
                    let long = coords[0].toFixed(6).toString();
                    let lat = coords[1].toFixed(6).toString();

                    if (zipCodes[long + "," + lat]) {
                      let values = zipCodes[long + "," + lat];

                      let arrObj = {
                        names: values,
                        long: Number(long),
                        lat: Number(lat),
                      };

                      // values.map((value) => {
                      //   let lastIdx = value.indexOf(" ");
                      //   let name = value.slice(0, lastIdx);
                      //   let id = value.slice(lastIdx + 1);
                      //   arrObj.push({
                      //     id,
                      //     name,
                      //     long: Number(long),
                      //     lat: Number(lat),
                      //   });
                      // });
                      setMultObjs(arrObj);
                    }
                  }}
                >
                  {/* {zipCodes[`${longitude},${latitude}`] && viewport.zoom > 15
                      ? zipCodes[`${longitude},${latitude}`].map((value, idx) => {
                          return <h1 key={idx}>{value}</h1>;
                        })
                      : null} */}
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
              <div
                onClick={() => {
                  setMultObjs({});
                  let long = cluster.geometry.coordinates[0].toString();
                  let lat = cluster.geometry.coordinates[1].toString();
                  if (zipCodes[long + "," + lat]) {
                    let value = zipCodes[long + "," + lat][0];
                    let lastIdx = value.indexOf(" ");
                    let name = value.slice(0, lastIdx);
                    let id = value.slice(lastIdx + 1);

                    setSelectObj({ id, name, long, lat });
                  }
                  setViewport({
                    width: 750,
                    height: 750,
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
                <Brightness1Icon fontSize="small" />
              </div>
            </Marker>
          );
        })}
        {multSelectedObj.names ? (
          <Popup
            latitude={Number(multSelectedObj.lat)}
            longitude={Number(multSelectedObj.long)}
            closeButton={false}
            // closeOnClick={true}
            // onClose={() => {
            //   setViewport({
            //     width: 750,
            //     height: 750,
            //     zoom: 8,
            //     latitude: multSelectedObj.lat,
            //     longitude: multSelectedObj.long,
            //   });
            //   setMultObjs({});
            // }}
          >
            <div>
              {multSelectedObj.names.map((value, idx) => {
                let lastIdx = value.indexOf(" ");
                let name = value.slice(0, lastIdx);
                let id = value.slice(lastIdx + 1);
                return (
                  <div
                    style={{ backgroundColor: "white" }}
                    onClick={() => <Redirect to={`/pet/${id}`} />}
                  >
                    <Link to={`/pet/${id}`}>
                      <h3 key={idx}>{name}</h3>
                    </Link>
                  </div>
                );
              })}
            </div>
          </Popup>
        ) : null}

        {selectedObj.id ? (
          <Popup
            latitude={Number(selectedObj.lat)}
            longitude={Number(selectedObj.long)}
            closeButton={false}
            // onClose={() => {
            //   setSelectObj({});
            //   setViewport({
            //     ...viewport,
            //     zoom: 8,
            //   });
            // }}
          >
            <Link to={`/pet/${selectedObj.id}`}>
              <h2>{selectedObj.name}</h2>
            </Link>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
};

export default Map;
