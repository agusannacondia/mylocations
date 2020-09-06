import React, { useReducer } from "react";
import LocationContext from "./LocationContext.js";
import LocationReducer from "./LocationReducer.js";
import { ADD_LOCATION, REMOVE_LOCATION } from "./types";

const initialLocations = () => {
  let array = JSON.parse(localStorage.getItem("locations"));
  if (array == null) {
    array = [];
    localStorage.setItem("locations", JSON.stringify(array));
  }
  return array;
} 

const LocationState = (props) => {
  const initialState = {
    locations: initialLocations(),
  };

  const [state, dispatch] = useReducer(LocationReducer, initialState);

  const addLocation = (location) => {
    let array = JSON.parse(localStorage.getItem("locations"));
    array.push(location);
    localStorage.setItem("locations", JSON.stringify(array));
    dispatch({
      type: ADD_LOCATION,
      payload: location,
    });
  };

  const removeLocation = (location) => {
    let array = JSON.parse(localStorage.getItem("locations"));
    let arrayNuevo = array.filter(
      (item) => {
        if(item.name === location.name && item.color === location.color) {
          return false;
        } return true;
      }
    );
    localStorage.setItem("locations", JSON.stringify(arrayNuevo));
    dispatch({
      type: REMOVE_LOCATION,
      payload: arrayNuevo,
    });
  };

  const existsLocation = (location) => {
    let array = JSON.parse(localStorage.getItem("locations"));
    if(array == null || array.length === 0){
      return false;
    }
    let arrayNuevo = array.filter((item) => item.name === location.name && item.color === location.color);
    return arrayNuevo.length > 0;
  }

  return (
    <LocationContext.Provider
      value={{
        locations: state.locations,
        addLocation,
        removeLocation,
        existsLocation
      }}
    >
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationState;
