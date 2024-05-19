import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import YourRides from "./PassengerRides";
import Ride from './Ride';

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
        <div className="container-fluid">
            <div className="row ">
                <div className="col-md-3">
                    <YourRides></YourRides>
                </div>
                <div className="col-md-9">
                    <h2 className="my-3 text-primary">Past rides</h2>
                    {pastRides.length > 0 ? (
                        pastRides.map(ride => (
                            <Ride key={ride.id} ride={ride} />
                        ))
                    ) : (
                    <div className="no-rides">
                         <p className='not-found-text'>No results found</p>
                        <img src="undraw_not_found_re_bh2e.png" alt="No Rides Found" />  
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PassengerPastRides;