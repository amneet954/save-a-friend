import React, { Component } from "react";
import { connect } from "react-redux";
import ReactMapGL, { Marker } from "react-map-gl";
let accessToken =
  "pk.eyJ1IjoiYW1uZWV0OTU0IiwiYSI6ImNqdjJpd215dzB5azIzeXFvZDMxbmk2ZDYifQ.FIIav70z0itM7EsJHAe_6A";
class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: 400,
        height: 400,
        latitude: 40.68420971837575,
        longitude: -73.83163001900016,
        zoom: 12,
      },
    };
    this.handleViewportChange = this.handleViewportChange.bind(this);
  }

  handleViewportChange(viewport) {
    console.log(viewport);
    this.setState({
      viewport,
    });
  }

  componentDidMount() {}
  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={accessToken}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={(viewport) => this.handleViewportChange(viewport)}
      ></ReactMapGL>
    );
  }
}

const mapState = (state) => ({
  userInfo: state,
});

export default connect(mapState, null)(Map);
