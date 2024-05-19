import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/passengerRequests.css'
import YourRides from './PassengerRides';

const PassengerRequests = () => {
    const { passengerId } = useParams();
    const [passengerRequests, setPassengerRequests] = useState([]);

    useEffect(() => {
        fetchPassengerRequests();
    }, [passengerId]);

    const fetchPassengerRequests = async () => {
        const hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
        try {
            
            const response = await axios.get(`http://${hostname}:8080/api/passengers/requests/${passengerId}`);
           
            console.log(response.data.requests)
            setPassengerRequests(response.data.requests)
           
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };
    
    if (!Array.isArray(passengerRequests)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-3">
                    <YourRides></YourRides>
                </div>
                <div className="col-md-9">
                    <h2 className="my-3 text-primary">Requests</h2>
            <ul>
                {passengerRequests.map(request => (
                    <li key={request.requestId} className="card">
                        <div className='card-header'>{request.locationFrom} - {request.locationTo}</div>
                        <div><strong>Departure:</strong> {request.timeFrom}</div>
                        <div><strong>Arrival:</strong> {request.timeTo}</div>
                        <div><strong>Driver ID:</strong> {request.driverId}</div>
                        <div className={`${getStatusBackground(request.requestStatusEnum)}`}><strong>Status:</strong> {request.requestStatusEnum}</div>
                    </li>
                ))}
            </ul>
                </div>
            </div>
        </div>
    );
}

const getStatusBackground = (status) => {
    switch (status) {
        case 'ACCEPTED':
            return 'bg-success';
        case 'REJECTED':
            return 'bg-danger';
        case 'PENDING':
            return 'bg-warning';
        default:
            return '';
    }
};

export default PassengerRequests;