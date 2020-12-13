import React, { Component } from "react";
import { connect } from "react-redux";
import { gettingAllReports } from "../store";
import ReactMapGL, { Marker, GeolocateControl, Popup } from "react-map-gl";
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
        latitude: 40.69,
        longitude: -73.8213,
        zoom: 12,
      },
      selectedPet: "",
      userLocation: {
        long: 0,
        lat: 0,
      },
    };
    this.handleViewportChange = this.handleViewportChange.bind(this);
    this.mapPopUp = this.mapPopUp.bind(this);
    this.mapClose = this.mapClose.bind(this);
    this.setUserLocation = this.setUserLocation.bind(this);
  }

  async componentDidMount() {
    let userId = this.props.userInfo._id;
    if (!userId) this.props.history.push("/");
    else await this.props.dispatchReport(userId);
  }

  handleViewportChange(viewport) {
    this.setState({
      viewport,
    });
  }

  mapPopUp(value) {
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

  setUserLocation() {
    console.log("bastard");
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      this.setState(
        {
          viewport: {
            width: 400,
            height: 400,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            zoom: 14,
          },
        },
        console.log(this.state.viewport)
      );
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.setUserLocation}>My Location</button>
        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={accessToken}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={(viewport) => this.handleViewportChange(viewport)}
        >
          {/* <GeolocateControl
            positionOptions={{ enableHighAccuracy: true, timeout: 10000 }}
            trackUserLocation={true}
            showUserLocation={true}
          /> */}
          {Object.entries(this.props.report).map(([key, value]) => {
            return (
              <Marker
                key={value._id}
                latitude={value.geo.latitude}
                longitude={value.geo.longitude}
              >
                <div onMouseEnter={() => this.mapPopUp(value)}>
                  <img
                    src="https://cdn.pixabay.com/photo/2020/07/24/15/05/button-5434253_1280.png"
                    alt="Red Dot"
                    style={{ width: "6%" }}
                  />
                </div>
              </Marker>
            );
          })}
          <Marker
            latitude={this.state.userLocation.lat}
            longitude={this.state.userLocation.long}
          >
            I'm Here!!!
          </Marker>

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
