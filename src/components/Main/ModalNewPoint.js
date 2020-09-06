import React, { useState, useEffect, Fragment, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { GithubPicker } from "react-color";
import Error from "./Error";
import { CSSTransition } from "react-transition-group";
import LocationContext from "../../context/LocationContext";

const ModalNewPoint = ({ closeModal, addPoint, locationSelected }) => {
  const locationContext = useContext(LocationContext);
  const { existsLocation } = locationContext;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const colors = [
    "#4F9EC4",
    "#A5C8E4",
    "#E0FEFE",
    "#C0ECCC",
    "#F9F0C1",
    "#F4CDA6",
    "#F6A8A6",
    "#FEC8D8",
    "#E0BBE4",
    "#957DAD",
  ];

  useEffect(() => {}, []);

  const [point, setPoint] = useState({
    location: {},
    name: "",
    letter: "",
    color: "",
  });

  const onInputChange = (e) => {
    setPoint({
      ...point,
      [e.target.name]: e.target.value,
    });
  };

  const onColorChange = (color) => {
    setPoint({
      ...point,
      color: color.hex,
    });
  };

  const handleCancel = () => {
    closeModal();
  };

  const handleSubmit = () => {
    if (point.name === "") {
      setError(true);
      setErrorMessage("Seleccione un nombre");
      return;
    }

    if (point.color === "") {
      setError(true);
      setErrorMessage("Seleccione un color");
      return;
    }

    if (!locationSelected) {
      setError(true);
      setErrorMessage("Seleccione una ubicación");
      return;
    }

    let newPoint = {
      ...point,
      location: locationSelected,
    };

    if (existsLocation(newPoint)) {
      setError(true);
      setErrorMessage("La ubicación ya existe");
      return;
    }

    setPoint(newPoint);
    addPoint(newPoint);
    setError(false);
    setErrorMessage("");
  };

  return (
    <Fragment>
      <CSSTransition in={error} timeout={300} classNames="move" unmountOnExit>
        <Error errorMessage={errorMessage} />
      </CSSTransition>
      <div className="Modal">
        <strong className="Modal__Header">
          <p>Nuevo Marcador</p>
          <button className="Modal__Button__Salir" onClick={closeModal}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </strong>
        <div className="Modal__Content">
          <div className="Modal__Content__Data">
            <div className="Modal__Content__Data__Nombre">
              <label htmlFor="name">Nombre</label>
              <input type="text" name="name" onChange={onInputChange} />
            </div>
            {false && (
              <div className="Modal__Content__Data__Letra">
                <label htmlFor="letter">Letra</label>
                <input
                  type="text"
                  name="letter"
                  maxLength="1"
                  onChange={onInputChange}
                />
              </div>
            )}
          </div>
          <div className="Modal__Content__Color">
            <GithubPicker
              colors={colors}
              width={"auto"}
              onChange={onColorChange}
            />
          </div>
        </div>
        <div className="Modal__Buttons">
          <button className="Modal__Button__Cancelar" onClick={handleCancel}>
            Cancelar
          </button>
          <button
            className="Modal__Button__Agregar"
            onClick={handleSubmit}
            style={{
              backgroundColor: point.color === "" ? "light-grey" : point.color,
              color:
                point.color === "#4f9ec4" || point.color === "#957dad"
                  ? "white"
                  : "black",
            }}
          >
            Agregar
          </button>
          
        </div>
      </div>
    </Fragment>
  );
};

export default ModalNewPoint;
