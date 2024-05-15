import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import YourRides from "./PassengerRides";


const PassengerPastRides = () => {
    const { passengerId } = useParams();
    const [pastRides, setPastRides] = useState([]);

    useEffect( () => {
        fetchPastRides();
    }, [passengerId]);

    const fetchPastRides = async () => {
        const hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
        try {
            const response = await axios.get(`http://${hostname}:8080/api/passengers/past-rides/${passengerId}`);
            setPastRides(response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    return (
        <div>
            <YourRides></YourRides>
            <div>
            <h2 className="p-3">Past rides</h2>
            <ul>
                {pastRides.map(ride => (
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

export default PassengerPastRides;