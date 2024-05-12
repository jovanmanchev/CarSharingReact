import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/card.css'
import { useParams } from 'react-router-dom';
const DriverProfile = () => {
    const { driverId } = useParams();
    const [driver, setDriver] = useState(null);

    const [bio, setBio] = useState("");

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const fetchDriver = async () => {
        const hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
        try {
            
            const response = await axios.get(`http://${hostname}:8080/api/drivers/driver/${driverId}`);
            setBio(response.data.bio)
            setDriver(response.data);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            bio: bio
        };

        try {
            const response = await axios.post(`http://localhost:8080/api/drivers/update/${driverId}`, data);
            console.log('Success:', response.data);
            alert('Driver updated successfully!');
        } catch (error) {
            console.error('Error updating driver:', error.response ? error.response.data : error.message);
            alert('Failed to update driver: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    useEffect(() => {
        fetchDriver();
    }, [driverId]);

    if (!driver) {
        return <div>Loading...</div>;
    }
    return (
        
            <div className="card">
                
                    <div className='header'>
                        <h5 className="title">{driver.firstName} {driver.lastName}</h5>
                        
                    </div>
                    <div className='card-content'>
                        <div >
                            <div className="rating-text">Rating: {driver.rating || 'None'} / 5</div>
                           
                            <div className='rating-text'>Bio</div>
                            <form onSubmit={handleSubmit}>
                                <input placeholder='Write something...' className='text-field mt-3' value={bio} onChange={handleBioChange}/>
                                <button type="submit" className="submit-button">Save</button>

                            </form>
                          
                        </div>                    
                    </div>
             
               
            </div>
        
    );
};

export default DriverProfile;
