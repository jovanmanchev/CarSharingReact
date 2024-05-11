import React from 'react';
import '../styles/navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/">CarConnect</Link>
            </div>
            <div className="nav-links">
                <Link to="/">HOME</Link>
                <Link to="/how-it-works">HOW IT WORKS</Link>
                <Link to="/about-us">ABOUT US</Link>
                <Link to="/your-rides">YOUR RIDES</Link>
            </div>
            <div className="nav-user">
                <Link to="/profile">John Smith</Link>
            </div>
        </nav>
    );
};

export default Navbar;
