import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/passengerRequests.css'
import YourRides from './PassengerRides';

const PassengerUpcomingRides = () => {
    const { passengerId } = useParams();
    const [upcomingRides, setUpcomingRides] = useState([]);

    useEffect(() => {
        fetchUpcomingRides();
    }, [passengerId]);

    const fetchUpcomingRides = async () => {
        const hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
        try {
            
            const response = await axios.get(`http://${hostname}:8080/api/passengers/upcoming-rides/${passengerId}`);
            setUpcomingRides(response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    return (
        <div>
            <YourRides></YourRides>
            <div>
            <h2 className="p-3">Upcoming rides</h2>
            <ul>
                {upcomingRides.map(ride => (
                    <li key={ride.id} className="card">
                        <div className='card-header'>{ride.locationFrom} - {ride.locationTo}</div>
                        <div><strong>Departure:</strong> {ride.timeFrom}</div>
                        <div><strong>Arrival:</strong> {ride.timeTo}</div>
                        <div><strong>Driver:</strong> {ride.driverNameSurname}</div>
                        <div><strong>Status:</strong> {ride.rideStatus}</div>
                    </li>
                ))}
            </ul>
        </div>
        </div>
    );
};

export default  PassengerUpcomingRides;