import React from "react";
import Main from "./components/Main";
import LocationState from "./context/LocationState";

function App() {
  return (
    <LocationState>
      <Main />
    </LocationState>
  );
}

export default App;