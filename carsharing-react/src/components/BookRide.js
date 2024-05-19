import React, { useEffect, useState  } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/bookRide.css'
import dayjs from 'dayjs';
import Ride from './Ride';

const BookRide = () => {
    const { rideId } = useParams();
    const navigate  = useNavigate();
    const [ride, setRide] = useState(null)

    const fetchRideDetails = async () => {
        let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
        if(hostname == 'localhost')
            hostname += ":8080";
        try{
            let response = await axios.get(`http://${hostname}/api/rides/getRideDetails/${rideId}`);
            setRide(response.data);
        }catch(error){
            console.error('Failed to fetch ride details', error);
        }
       
    }

    useEffect(()=> {
        fetchRideDetails();
    }, [rideId])

    const handleSendRequest = async () => {
        const data = {
            rideId: parseInt(rideId, 10),
            passengerId: 1 // Hardcoded for now, will be changed to take the passenger id when auth is added
        };

        try {
            let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
            console.log(data)
            if(hostname == 'localhost')
                hostname += ":8080";
            await axios.post(`http://${hostname}/api/requests/requestRide`, data);
            alert('Request sent successfully!');
            navigate ('/'); 
        } catch (error) {
            console.error('Error sending ride request:', error);
            alert('Failed to send request.');
        }
    };
    if (!ride) {
        return <div>Loading...</div>; 
    }
    return (
       <div className='BookRideContainer'>
            <h3 className='bookRideTitle text-primary my-3'>Book ride:</h3>
                <div className='ride-details'>
                    <Ride key={ride.id} ride={ride}></Ride>                  
                    <div className='driver-info'>
                        <strong>{ride.driverNameSurname}</strong>
                        <p>{ride.driverBio}</p>
                    </div>
                <div className="preferences">
                    <strong>Preferences</strong>
                    <ul>
                        <li>Chattiness: {ride.chattiness ? '✔' : '✖'}</li>
                        <li>Smoking: {ride.smoking ? '✔' : '✖'}</li>
                        <li>Pets: {ride.pets ? '✔' : '✖'}</li>
                        <li>Music: {ride.music ? '✔' : '✖'}</li>
                    </ul>
                </div>
                <button onClick={handleSendRequest}>Send Request</button>
            </div>
        </div>
    );
};

export default BookRide;
