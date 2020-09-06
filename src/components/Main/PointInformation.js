import React, { useEffect, useState } from "react";
import Button from "./Button";

const PointInformation = ({ location, hideInfo }) => {
  const [position, setPosition] = useState({});

  useEffect(() => {

    if (!location || typeof location.location === "undefined") return;

    const lat =
      typeof location.location.lat === "number"
        ? location.location.lat
        : location.location.lat();
    const lng =
      typeof location.location.lng === "number"
        ? location.location.lng
        : location.location.lng();
    setPosition({
      lat: truncateDecimals(lat, 6),
      lng: truncateDecimals(lng, 6),
    });
  }, [location]);

  if (!location || typeof location.location === "undefined") return null;

  return (
    <div className="Info__Container">
      <div className="Info__Header">
        <h2>{location.name}</h2>
        <Button quit={true} onClick={hideInfo} />
      </div>
      <div className="Info__List">
        <iframe
          title={"Google Street View"}
          style={{ border: '0px solid', width: "100%", height: "calc(70vh - 115px)" }}
          src={`https://www.google.com/maps/embed/v1/streetview?key=${process.env.REACT_APP_API_KEY}&location=${position.lat},${position.lng}&heading=210&pitch=0&fov=100`}
          allowFullScreen
          zoom={1}
          zoomControl={false}
          mapTypeControl={false}
          scaleControl={false}
          rotateControl={false}
          fullscreenControl={false}
        ></iframe>
      </div>
    </div>
  );
};

export default PointInformation;

const truncateDecimals = (number, digits) => {
  var multiplier = Math.pow(10, digits),
      adjustedNum = number * multiplier,
      truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

  return truncatedNum / multiplier;
};