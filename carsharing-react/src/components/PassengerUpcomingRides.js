import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/passengerRequests.css'
import YourRides from './PassengerRides';
import Ride from './Ride';

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
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-3">
                    <YourRides></YourRides>
                </div>
                <div className="col-md-9">
                    <h2 className="my-3 text-primary">Upcoming rides</h2> 
                    {upcomingRides.length > 0 ? (
                        upcomingRides.map(ride => (
                            <Ride key={ride.id} ride={ride} />
                        ))
                    ) : (
                    <div className="no-rides">
                         <p className='not-found-text'>No results found</p>
                         <img src="/undraw_not_found_re_bh2e.png" alt="No Rides Found" />
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default  PassengerUpcomingRides;