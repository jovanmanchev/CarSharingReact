import React, { useState, useEffect } from 'react';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; 
const Navbar = () => {

    const [userName, setUserName] = useState('');
    const [linkPath, setLinkPath] = useState("/your-rides");
    const [accountLinkPath, setAccountLinkPath] = useState("/profile");

    useEffect(() => {
      
        const role = localStorage.getItem('role');
        const id = localStorage.getItem('id');

       
        if (role && id) {
            if (role === 'ROLE_DRIVER') {
                setAccountLinkPath(`/driver/${id}`);
            } else if (role === 'ROLE_PASSENGER') {
                setAccountLinkPath(`/passenger/${id}`);
            }
        }
    }, []); 

    const setRole = async () => {
        const role = localStorage.getItem('role');
        const id = localStorage.getItem('id');
        console.log(role)
        if (role && id) {
            if (role === 'ROLE_PASSENGER') {
              
                setLinkPath(`/your-rides/${id}`);
            } else {
                console.log('asdasd')
                setLinkPath(`/ridesForDriver/${id}`);
            }
        }
    }
    useEffect(() => {
        setRole();
    }, []); 
    useEffect(() => {
        
        const firstName = localStorage.getItem('firstName');
        const lastName = localStorage.getItem('lastName');
      
        if (firstName && lastName) {
          
            const fullName = `${firstName} ${lastName}`;
            setUserName(fullName);
        } else {
          
            console.error('Failed to retrieve name from localStorage');
        }
    }, []);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/rides">CarConnect</Link>
            </div>
            <div className="nav-links">
                <Link to="/rides">HOME</Link>
                <Link to="/how-it-works">HOW IT WORKS</Link>
                <Link to="/about-us">ABOUT US</Link>
                <Link to={linkPath}>YOUR RIDES</Link>
            </div>
            <div className="nav-user">
            <Link to={accountLinkPath}>{userName}</Link>
            </div>
        </nav>
    );
};

export default Navbar;
