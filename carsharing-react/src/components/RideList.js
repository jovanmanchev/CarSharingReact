import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ride from './Ride';
import dayjs from 'dayjs'; 
import '../styles/ride.css'
import '../styles/search.css'
import { useFilters } from './FiltersContext';
const RidesList = () => {
    const [rides, setRides] = useState([]);
    const [startLocation, setStartLocation] = useState('');
    const [destination, setDestination] = useState('');
    const [departure, setDeparture] = useState(new Date());
    const [filteredRides, setFilteredRides] = useState([]);  

    const { timeFilter, sortOption, preferences  } = useFilters();
    useEffect(() => {
        fetchRidesAll();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [timeFilter, rides, sortOption, preferences]); 
    const fetchRidesAll = async () => {
      
        let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
        if(hostname == 'localhost')
            hostname += ":8080";
        try{
            const response = await axios.get(`http://${hostname}/api/rides/getRides`, {});
            
            setRides(response.data.map(ride => ({
                ...ride,
                timeFrom: dayjs(ride.timeFrom),
                timeTo: dayjs(ride.timeTo)
            })));
        }catch (error) {
            console.error('Failed to fetch data', error);
        }
  
    };
    const fetchRides = async () => {
        const formattedDate = dayjs(departure).format('YYYY-MM-DDTHH:mm:ss');
        let hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
      
        if(hostname == 'localhost')
            hostname += ":8080";
        try{
            const response = await axios.get(`http://${hostname}/api/passengers/search`, {
                params: {
                    startLocation,
                    destination,
                    departure: formattedDate
                }
            });
            
            setRides(response.data.map(ride => ({
                ...ride,
                timeFrom: dayjs(ride.timeFrom),
                timeTo: dayjs(ride.timeTo)
            })));
        }catch (error) {
            console.error('Failed to fetch data', error);
        }
  
    };

    const applyFilters = () => {
        let result = rides; 
        if (timeFilter) {
            result = result.filter(ride => {
                const hour = dayjs(ride.timeFrom).hour();
                switch (timeFilter) {
                    case 'before 6:00': return hour < 6;
                    case '6:00-12:00': return hour >= 6 && hour < 12;
                    case '12:00-18:00': return hour >= 12 && hour < 18;
                    case 'after 18:00': return hour >= 18;
                    default: return true;
                }
            });
            
    
        }
        
            if (sortOption === 'price') {
                result.sort((a, b) => a.pricePerPerson - b.pricePerPerson);
            } else if (sortOption === 'earliest') {
                result.sort((a, b) => dayjs(a.timeFrom).unix() - dayjs(b.timeFrom).unix());
            }

            result = result.filter(ride => {
              
                return Object.entries(preferences).every(([key, enabled]) => {
                    return enabled ? ride[key] : true;
                });
            });    
        setFilteredRides(result);  
    };
    
    

    return (
        <div>
            <div className="search-filters">
            <input 
                type="text" 
                placeholder="Start Location" 
                value={startLocation} 
                onChange={(e) => setStartLocation(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Destination" 
                value={destination} 
                onChange={(e) => setDestination(e.target.value)} 
            />
            <input 
                type="datetime-local" 
                value={dayjs(departure).format('YYYY-MM-DDTHH:mm')} 
                onChange={(e) => setDeparture(e.target.value)}
            />
            <button onClick={fetchRides}>Search</button>
        </div>
        
        {filteredRides.length > 0 ? (
        filteredRides.map(ride => (
            <Ride key={ride.id} ride={ride} />
        ))
            ) : (
                <div className="no-rides">
                     <p className='not-found-text'>No results found</p>
                    <img src="undraw_not_found_re_bh2e.png" alt="No Rides Found" />
                   
                </div>
            )}
        </div>
    );
};

export default RidesList;
