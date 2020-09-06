import React from 'react';
import Point from './Point'

const ListPoints = ({ locations, onInfoClick, onRemoveClick }) => {
    
    if(!locations || locations.length === 0) return (
        <p>Clickeá el mapa para agregar una ubicación.</p>
    );

    return (
        <div>
            {
                locations.map((item, index) => (
                    <Point key={index} location={item} onInfoClick={onInfoClick} onRemoveClick={onRemoveClick}/>
                ))
            }
        </div>
    );
}

export default ListPoints;