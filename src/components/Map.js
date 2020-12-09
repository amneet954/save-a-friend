import React, { Component } from "react";
import { connect } from "react-redux";
import { gettingAllReports } from "../store";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import { Link } from "react-router-dom";
import Brightness1Icon from "@material-ui/icons/Brightness1";
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
        zoom: 14,
      },
      selectedPet: "",
    };
    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.mapPopUp = this.mapPopUp.bind(this);
    this.mapClose = this.mapClose.bind(this);
  }

  async componentDidMount() {
    let userId = this.props.userInfo._id;
    await this.props.dispatchReport(userId);
  }

  handleViewportChange(viewport) {
    // console.log(viewport);
    this.setState({
      viewport,
    });
  }

  mapPopUp(value) {
    // event.preventDefault();
    this.setState(
      {
        selectedPet: value,
      },
      () => {
        console.log("this.state.selectedPet: ", this.state.selectedPet);
      }
    );
  }
  mapClose() {
    this.setState(
      {
        selectedPet: {},
      },
      () => {
        console.log("this.state.selectedPet: ", this.state.selectedPet);
      }
    );
  }
  render() {
    return (
      <div>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={accessToken}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(viewport) => this.handleViewportChange(viewport)}
        >
          {Object.entries(this.props.report).map(([key, value]) => {
            return (
              <Marker
                key={value._id}
                latitude={value.geo.latitude}
                longitude={value.geo.longitude}
              >
                <div onMouseEnter={() => this.mapPopUp(value)}>
                  <Brightness1Icon fontSize="small" />
                </div>
              </Marker>
            );
          })}

          {this.state.selectedPet.geo ? (
            <Popup
              latitude={this.state.selectedPet.geo.latitude}
              longitude={this.state.selectedPet.geo.longitude}
              onClose={this.mapClose}
            >
              <div>
                <h2>{this.state.selectedPet.petName}</h2>
              </div>
            </Popup>
          ) : null}
        </ReactMapGL>
      </div>
    );
  }
}

const mapState = (state) => ({
  userInfo: state.user,
  report: state.report,
});

const mapDispatch = (dispatch) => {
  return {
    dispatchReport: (userId) => dispatch(gettingAllReports(userId)),
  };
};

export default connect(mapState, mapDispatch)(Map);
