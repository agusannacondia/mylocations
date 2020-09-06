import React from "react";

const Error = ({ errorMessage }) => {
  if (!errorMessage || errorMessage.length === 0) return null;

  return (
    <div className="Modal__Error">
      <p>{errorMessage}</p>
    </div>
  );
};

export default Error;
