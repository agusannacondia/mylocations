import React from "react";
import Button from "./Button";

const Point = ({ onInfoClick, onRemoveClick, location }) => {
  const handleRemove = () => {
    onRemoveClick(location);
  };

  const handleInfo = () => {
    onInfoClick(location);
  }

  return (
    <div className="Point">
      <Button
        info={true}
        onClick={handleInfo}
        style={{
          backgroundColor: location.color,
          color:
            location.color === "#4f9ec4" || location.color === "#957dad"
              ? "white"
              : "black",
        }}
      />
      <h4>{location.name}</h4>
      <Button remove={true} onClick={handleRemove} />
    </div>
  );
};

export default Point;
