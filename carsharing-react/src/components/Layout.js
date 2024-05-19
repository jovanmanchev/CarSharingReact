import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../index.css'
const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main className = 'main'>{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
