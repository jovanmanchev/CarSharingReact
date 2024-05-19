import React from 'react';
import '../styles/ride.css';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

const Ride = ({ ride }) => {
    const { locationFrom, locationTo, timeFrom, pricePerPerson, timeTo, driverNameSurname } = ride;
    const navigate = useNavigate();

    const handleRideClick = () => {
        navigate(`/book-ride/${ride.id}`);
    };

   
    const formatDate = (date) => {
        return date && dayjs(date).isValid() ? dayjs(date).format('HH:mm') : 'NA';
    };

    return (
        <div className="ride" onClick={handleRideClick}>
     <div className="timeline">
                <div className="event">
                    <div className="time">{formatDate(timeFrom)}</div>
                    <div className="circle"></div>
                    <div className="details">{locationFrom}</div>
                    <div className="price">{pricePerPerson} den</div>
                </div>
                <div className="event">
                <div className="line"></div>
                    <div className="time">{formatDate(timeTo)}</div>
                
                    <div className="circle"></div>
                    
                    <div className="details">{locationTo}</div>
                    <div className="price">{driverNameSurname}</div>
                    
                </div>
            </div>
    </div>
    );
};

export default Ride;
