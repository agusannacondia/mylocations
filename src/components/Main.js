import React, { useState, useContext } from "react";
import { CSSTransition } from "react-transition-group";
import MapContainer from "./Main/MapContainer";
import Panel from "./Main/Panel";
import PointInformation from "./Main/PointInformation";
import ModalNewPoint from "./Main/ModalNewPoint";
import LocationContext from "../context/LocationContext";
import Confetti from "react-dom-confetti";
import { useMediaQuery } from "react-responsive";

const config = {
  angle: 0,
  spread: "180",
  startVelocity: 80,
  elementCount: 150,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "1000px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Main = () => {
  const isMobile = useMediaQuery({
    query: "(max-device-width: 600px)",
  });

  const locationContext = useContext(LocationContext);
  const { addLocation, removeLocation } = locationContext;

  const [submited, setSubmited] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [deployPanel, setDeployPanel] = useState(false);
  const [locationSelected, setLocationSelected] = useState(null);

  const onMapClick = (location) => {
    if (!showModal) {
      setLocationSelected(location);
      setShowModal(true);
      setShowInfo(false);
      setSubmited(false);
    }
    if (isMobile) {
      setDeployPanel(false);
    }
  };

  const onMarkerClick = (location) => {
    if (showModal) {
      setShowModal(false);
    }
    if (isMobile) {
      setDeployPanel(false);
    }
    setLocationSelected(location);
    setShowInfo(true);
  };

  const closeModal = () => {
    setLocationSelected(null);
    setShowModal(false);
  };

  const closeInfo = () => {
    setLocationSelected(null);
    setShowInfo(false);
  };

  const addPoint = (point) => {
    if (locationSelected !== null) {
      addLocation(point);
    }
    closeModal();
    setSubmited(true);
  };

  const showInfoPanel = (location) => {
    if (showModal) {
      setShowModal(false);
    }
    if (isMobile) {
      setDeployPanel(false);
    }
    setLocationSelected(location);
    setShowInfo(true);
  };

  const onRemoveClick = (location) => {
    removeLocation(location);
    setLocationSelected(null);
    setShowInfo(false);
  };

  return (
    <div className="Container">
      <MapContainer
        onMapClick={onMapClick}
        onMarkerClick={onMarkerClick}
        showModal={showModal}
      />
      {!showInfo && (
        <Panel
          deployPanel={deployPanel}
          setDeployPanel={setDeployPanel}
          showInfo={showInfoPanel}
          removeLocation={onRemoveClick}
        />
      )}
      <CSSTransition
        in={showInfo}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <PointInformation location={locationSelected} hideInfo={closeInfo} />
      </CSSTransition>
      {showModal && locationSelected && (
        <ModalNewPoint
          closeModal={closeModal}
          addPoint={addPoint}
          locationSelected={locationSelected}
        />
      )}
      <Confetti
        active={submited}
        config={config}
        style={{
          position: "relative",
          top: "50%",
          bottom: 0,
          left: "50%",
          right: 0,
          margin: "auto",
          zIndex: 1,
        }}
      />
    </div>
  );
};

export default Main;
