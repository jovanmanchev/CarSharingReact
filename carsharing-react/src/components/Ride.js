import React from 'react';
import '../styles/ride.css'
const Ride = ({ ride }) => {
    const { locationFrom, locationTo, timeFrom, pricePerPerson } = ride;

    return (
        <div className="ride">
            <div className="time-location">
                <span>{timeFrom.format('HH:mm')} → {locationFrom} - {locationTo}</span>
            </div>
            <div className="price">
                <span>{pricePerPerson} den</span>
            </div>
        </div>
    );
};

export default Ride;
