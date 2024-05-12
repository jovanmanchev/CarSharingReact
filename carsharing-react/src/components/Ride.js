import React, { useState } from 'react';
import '../styles/ride.css'
import dayjs from 'dayjs'; 
import { useNavigate } from 'react-router-dom';
const Ride = ({ ride }) => {
    const { locationFrom, locationTo, timeFrom, pricePerPerson } = ride;
  


    const navigate  = useNavigate();

    const handleRideClick = () => {
        navigate(`/book-ride/${ride.id}`);
    };


    return (
        <div className="ride"  onClick={handleRideClick}>
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
