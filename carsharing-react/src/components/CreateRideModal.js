import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import dayjs from 'dayjs';
import "../styles/modal.css"

Modal.setAppElement('#root'); 

const CreateRideModal = ({ driverId, isOpen, onClose, onRideCreated }) => {
    const [rideDetails, setRideDetails] = useState({
        locationFrom: '',
        locationTo: '',
        timeFrom: '',
        timeTo: '',
        pricePerPerson: '',
        chattiness: false,
        pets: false,
        smoking: false,
        music: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setRideDetails(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            ...rideDetails,
            timeFrom: dayjs(rideDetails.timeFrom).toISOString(),
            timeTo: dayjs(rideDetails.timeTo).toISOString(),
        };
        try {
            let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
            if(hostname == 'localhost')
            hostname += ":8080";
            const response = await axios.post(`http://${hostname}/api/drivers/createRide/${driverId}`, data);
            onRideCreated();
            onClose(); 
        } catch (error) {
            console.error('Failed to create ride', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Create Ride"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <h2>Create Ride</h2>
            <form onSubmit={handleSubmit}>
                <input name="locationFrom" value={rideDetails.locationFrom} onChange={handleChange} placeholder="Location From" type='text' />
                <input name="locationTo" value={rideDetails.locationTo} onChange={handleChange} placeholder="Location To" type='text' />
                <input type="datetime-local" name="timeFrom" value={rideDetails.timeFrom} onChange={handleChange} />
                <input type="datetime-local" name="timeTo" value={rideDetails.timeTo} onChange={handleChange} />
                <input type="number" name="pricePerPerson" value={rideDetails.pricePerPerson} onChange={handleChange} placeholder="Price Per Person" />
                <label>
                    <input type="checkbox" name="chattiness" checked={rideDetails.chattiness} onChange={handleChange} />
                    Chattiness
                </label>
                <label>
                    <input type="checkbox" name="pets" checked={rideDetails.pets} onChange={handleChange} />
                    Pets
                </label>
                <label>
                    <input type="checkbox" name="smoking" checked={rideDetails.smoking} onChange={handleChange} />
                    Smoking
                </label>
                <label>
                    <input type="checkbox" name="music" checked={rideDetails.music} onChange={handleChange} />
                    Music
                </label>
                <button type="submit">Create Ride</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </Modal>
    );
};

export default CreateRideModal;
