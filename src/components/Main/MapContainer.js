import React, { useState, useContext, useEffect } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import LocationContext from "../../context/LocationContext";

const MapContainer = ({ google, onMapClick, onMarkerClick, showModal }) => {
  const locationContext = useContext(LocationContext);
  const { locations } = locationContext;

  const [ locationClicked, setLocationClicked ] = useState(null)

  useEffect(() => {
    if(!showModal) {
      setLocationClicked(null);
    }
  }, [showModal])

  const handleClick = (mapProps, map, clickEvent) => {
    if(!showModal) {
      setLocationClicked(clickEvent.latLng);
    }
    onMapClick(clickEvent.latLng);
  };

  const handleMarkerClick = (props, marker, e) => {
    let item = {
      location: props.position,
      name: props.name,
      color: props.icon.fillColor,
      letter: ''
    }
    onMarkerClick(item);
  }

  return (
    <Map
      google={google}
      zoom={14}
      initialCenter={{
        lat: -34.814416,
        lng: -58.469694,
      }}
      mapTypeControl={false}
      scaleControl={false}
      streetViewControl={false}
      panControl={false}
      rotateControl={false}
      fullscreenControl={false}
      zoomControl={false}
      onClick={handleClick}
    >
      {
        locationClicked && <Marker position={locationClicked}/>
      }
      {locations &&
        locations.map((item, index) => {
          return (
            <Marker
              key={index}
              onClick={handleMarkerClick}
              name={item.name}
              position={item.location}
              icon={colorMarker(item.color)}
            >
              <InfoWindow>
                <div>
                  <p>
                    Click on the map or drag the marker to select location where
                    the incident occurred
                  </p>
                </div>
              </InfoWindow>
            </Marker>
          );
        })}
    </Map>
  );
};

const colorMarker = (color) => {
  return {
    path: 'M 0,0 -1,-2 V -43 H 1 V -2 z M 1,-40 H 30 V -20 H 1 z',
    fillColor: color,
    fillOpacity: 1,
    strokeColor: '#000',
    strokeWeight: 2,
    scale: 1,
};
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_API_KEY,
})(MapContainer);
