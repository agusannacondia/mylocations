import React, { useState, Fragment, useContext, useEffect } from "react";
import { CSSTransition } from "react-transition-group";
import Button from "./Button";
import ListPoints from "./ListPoints";
import LocationContext from "../../context/LocationContext";

const Panel = ({ deployPanel, setDeployPanel, showInfo, removeLocation }) => {
  const locationContext = useContext(LocationContext);
  const { locations } = locationContext;

  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    if(!deployPanel) {
      setShowPanel(false);
    }
  }, [deployPanel]);

  const togglePanel = () => {
    var toggle = !showPanel;
    setDeployPanel(toggle);
    setShowPanel(toggle);
  };

  const onInfoClick = (info) => {
    showInfo(info);
  };

  const onRemoveClick = (location) => {
    removeLocation(location);
  };

  return (
    <Fragment>
      {!showPanel && <Button hamburger={true} onClick={togglePanel} />}
      <CSSTransition
        in={showPanel}
        timeout={300}
        classNames="slide"
        unmountOnExit
      >
        <div className="Panel__Container">
          <div className="Panel__Header">
            <h2>My locations</h2>
            <Button quit={true} onClick={togglePanel} />
          </div>
          <div className="Panel__List">
            <ListPoints
              locations={locations}
              onInfoClick={onInfoClick}
              onRemoveClick={onRemoveClick}
            />
          </div>
        </div>
      </CSSTransition>
    </Fragment>
  );
};

export default Panel;
