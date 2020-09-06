import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes, faInfoCircle, faTrashAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons'

const Button = ({ hamburger, quit, info, remove, add, onClick, style }) => {

    if(hamburger) {
        return (
            <button onClick={onClick} className="Button__Hamburger">
                <FontAwesomeIcon icon={faBars} />
            </button>
        )
    }

    if(info) {
        return (
            <button onClick={onClick} className="Button__Info" style={style}>
                <FontAwesomeIcon icon={faInfoCircle} />
            </button>
        )
    }

    if(remove) {
        return (
            <button onClick={onClick} className="Button__Remove">
                <FontAwesomeIcon icon={faTrashAlt} />
            </button>
        )
    }

    if(quit) {
        return (
            <button onClick={onClick} className="Button__Quit">
                <FontAwesomeIcon icon={faTimes} />
            </button>
        )
    }

    if(add) {
        return (
            <button onClick={onClick} className="Button__Add">
                <FontAwesomeIcon icon={faPlusCircle} />
            </button>
        )
    }
}

export default Button;