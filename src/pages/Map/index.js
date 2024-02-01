import React from "react";
import GoogleMapReact from "google-map-react";
import { Grid } from "@mui/material";

// eslint-disable-next-line react/prop-types
const AnyReactComponent = ({ text }) => <Grid>{text}</Grid>;

export default function SimpleMap() {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <Grid style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
        <AnyReactComponent lat={59.955413} lng={30.337844} text="My Marker" />
      </GoogleMapReact>
    </Grid>
  );
}
