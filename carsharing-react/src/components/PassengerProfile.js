import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/card.css'
import '../styles/profile.css'
import { useParams } from 'react-router-dom';
const Profile = () => {
    const { passengerId } = useParams();
    const [passenger, setPassenger] = useState(null);

    const [bio, setBio] = useState("");

    const handleBioChange = (event) => {
        setBio(event.target.value);
    };

    const fetchPassenger = async () => {
        const hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
        try {
            
            const response = await axios.get(`http://${hostname}:8080/api/passengers/passenger/${passengerId}`);
            setBio(response.data.bio)
            setPassenger(response.data);
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
            const response = await axios.post(`http://localhost:8080/api/passengers/update/${passengerId}`, data);
            console.log('Success:', response.data);
            alert('Passenger updated successfully!');
        } catch (error) {
            console.error('Error updating passenger:', error.response ? error.response.data : error.message);
            alert('Failed to update passenger: ' + (error.response ? error.response.data.message : error.message));
        }
    };

    useEffect(() => {
        fetchPassenger();
    }, [passengerId]);

    if (!passenger) {
        return <div>Loading...</div>;
    }
    return (
        <div className='profileContainer'>
            <div className="card">
                    <div className='header ml-5'>
                        <h5 className="title">{passenger.firstName} {passenger.lastName}</h5>
                    </div>
                    <div className='card-content'>
                        <div >
                            <div className="rating-text">Rating: {passenger.rating || 'None'} / 5</div>
                            <div className='rating-text'>Bio</div>
                            <form onSubmit={handleSubmit}>
                                <input placeholder='Write something...' className='text-field mt-3' value={bio} onChange={handleBioChange}/>
                                <button type="submit" className="submit-button">Save</button>
                            </form>
                        </div>                    
                    </div>
            </div>
        </div>    
    );
};

export default Profile;
