import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Ride from './Ride';
import dayjs from 'dayjs'; 
import CreateRideModal from './CreateRideModal';
const RidesForDriver = () => {
    const { driverId } = useParams();
    const [rides, setRides] = useState([]);
    const [rideType, setRideType] = useState('current'); 

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    useEffect(() => {
        fetchRides();
    }, [rideType]);

    const fetchRides = async () => {
        let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
        if(hostname == 'localhost')
            hostname += ":8080";
        let endpoint = rideType === 'current' ?
            `http://${hostname}/api/rides/incomingRidesForDriver/${driverId}` :
            `http://${hostname}/api/rides/pastRidesForDriver/${driverId}`;
        try {
           
            const response = await axios.get(endpoint, {})
            
            
            setRides(response.data.ridesForDriver.map(ride => ({
                ...ride,
                timeFrom: dayjs(ride.timeFrom),
                timeTo: dayjs(ride.timeTo)
            })));
        } catch (error) {
            console.error('Failed to fetch rides', error);
        }
    };

    const cancelRide = async (rideId) => {
        try {

            let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
            if(hostname == 'localhost')
                hostname += ":8080";
            await axios.delete(`http://${hostname}/api/drivers/${rideId}/${driverId}`);
            
            fetchRides();
        } catch (error) {
            console.error('Failed to cancel ride', error);
        }
    };

    return (
        <div className="rides-for-driver">
            <div className="ride-buttons">
                <button onClick={() => setRideType('current')}>Current Rides</button>
                <button onClick={() => setRideType('past')}>Past Rides</button>
            </div>
            <div className="ride-list">
             
            {rides.map(ride => (
            <div key={ride.id}> 
                <Ride ride={ride} />
                {rideType === 'current' && (
                    <button onClick={() => cancelRide(ride.id)}>Cancel Ride</button>
                )}
                {rideType !== 'current' && (
                    <label>{ride.timeFrom.format('YYYY-MM-DD HH:mm')}</label>  
                )}
    </div>
))}

            </div>
            <button onClick={openModal}>Create New Ride</button>
            <CreateRideModal driverId={driverId} isOpen={modalIsOpen} onClose={closeModal} />

        </div>
    );
};

export default RidesForDriver;
