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
    const [requests, setRequests] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);

    const openModal = () => setModalIsOpen(true);
    const closeModal = () => setModalIsOpen(false);
    useEffect(() => {
        fetchRides();
    }, [rideType]);

    const handleAccept = async (requestId, driverId) => {
        let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
        if(hostname == 'localhost')
            hostname += ":8080";
        let endpoint = `http://${hostname}/api/requests/acceptRequest/${requestId}/${driverId}`;

        try{

            await axios.post(endpoint);
            alert("Succefully accepted the request")
            fetchRides();
        }catch (error) {
            console.error('Failed send request', error);
        }

    }

    
    const handleReject = async (requestId, driverId) => {
        let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
        if(hostname == 'localhost')
            hostname += ":8080";
        let endpoint = `http://${hostname}/api/requests/ignoreRequest/${requestId}/${driverId}`;

        try{

            await axios.post(endpoint);
            alert("Succefully rejected the request")
            fetchRides();
        }catch (error) {
            console.error('Failed send request', error);
        }

    }

    const fetchRides = async () => {
        let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
        if(hostname == 'localhost')
            hostname += ":8080";
        let endpoint = '';
        if(rideType == 'current'){
             endpoint = `http://${hostname}/api/rides/incomingRidesForDriver/${driverId}`;
        }else if(rideType === 'past'){
            endpoint = `http://${hostname}/api/rides/pastRidesForDriver/${driverId}`;
        }else if(rideType === 'requests'){
            endpoint = `http://${hostname}/api/requests/getRequestsForDriver/${driverId}`;
        }
    
            
            
        try {
           
            const response = await axios.get(endpoint, {})
            
            if(rideType === 'current' || rideType === 'past'){
                setRides(response.data.ridesForDriver.map(ride => ({
                    ...ride,
                    timeFrom: dayjs(ride.timeFrom),
                    timeTo: dayjs(ride.timeTo)
                })));
            }else{
                
                setRequests(response.data.requests.map(requsest => ({
                    ...requsest,
                    timeFrom: dayjs(requsest.timeFrom),
                    timeTo: dayjs(requsest.timeTo)
                })));
            }
        
          
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
                <button onClick={() => setRideType('requests')}>Requests</button>
            </div>
            <div className="ride-list">
    {rideType === 'requests' ? (
        requests.map(request => (
            <div key={request.requestId}>
                <div>{request.locationFrom} - {request.locationTo}</div>
                <div>Request Time: {dayjs(request.timeFrom).format('YYYY-MM-DD HH:mm')}</div>
                <div>Status: {request.requestStatusEnum}</div>
                {request.requestStatusEnum === 'PENDING' && (
                <div>
                    <button onClick={() => handleAccept(request.requestId, request.driverId)}>Accept</button>
                    <button onClick={() => handleReject(request.requestId, request.driverId)}>Reject</button>
                </div>
            )}
            </div>
        ))
    ) : (
        rides.map(ride => (
            <div key={ride.id}> 
                <Ride ride={ride} />
                {rideType === 'current' && (
                    <button onClick={() => cancelRide(ride.id)}>Cancel Ride</button>
                )}
                {rideType === 'past' && (
                    <label>{dayjs(ride.timeFrom).format('YYYY-MM-DD HH:mm')}</label>  
                )}
            </div>
        ))
    )}
</div>

            <button onClick={openModal}>Create New Ride</button>
            <CreateRideModal driverId={driverId} isOpen={modalIsOpen} onClose={closeModal} onRideCreated={fetchRides} />

        </div>
    );
};

export default RidesForDriver;
