import React, { useEffect, useState } from 'react';
import '../styles/footer.css'
import { Link, json } from 'react-router-dom';
import axios from 'axios';

const Footer = () => {

    const [rides, setRides] = useState([])

    const getRides = async () => {
        const hostname = process.env.REACT_APP_API_HOST || window.location.hostname;
        try {
            const response = await axios.get(`http://${hostname}:8080/api/rides/getRides`);
          
            const newRides = response.data.slice(0, 3).map(x => `${x.locationFrom} - ${x.locationTo}`);
            
            setRides(newRides);
        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    }
    

    useEffect(() => {
        getRides();
    }, [])

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-logo">
                    <div>
                    <Link to="/"><img src="/Logo.png" alt="CarConnect Logo" /></Link>
                    </div>
                    <div className="footer-links">
                    <div><Link to="/how-it-works">HOW IT WORKS</Link></div>
                    <Link to="/about-us">ABOUT US</Link>
                </div>
                </div>
              
                <div className="footer-destinations">
                {rides.map((ride, index) => (
                        <div key={index} className="destination">{ride}</div>
                    ))}
                </div>
                <div className="footer-social">
                    <a href="https://twitter.com"><i className="fab fa-twitter"></i></a>
                    <a href="https://linkedin.com"><i className="fab fa-linkedin-in"></i></a>
                    <a href="https://facebook.com"><i className="fab fa-facebook-f"></i></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
