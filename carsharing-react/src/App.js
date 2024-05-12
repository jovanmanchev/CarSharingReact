import React from 'react';
import Profile from './components/PassengerProfile'; 
import Layout from './components/Layout';
import RidesList from './components/RideList';
import RidesWrapper from './components/RidesWrapper'
import RidesForDriver from './components/RidesForDriver';
import BookRide from './components/BookRide';
import DriverProfile from './components/DriverProfile';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <Layout>
        <Routes>
           
              <Route path="/passenger/:passengerId" element={<Profile />} />
              <Route path="/driver/:driverId" element={<DriverProfile />} />
              <Route path="/rides" element={<RidesWrapper />} />
              <Route path="/ridesForDriver/:driverId" element={<RidesForDriver />} />
              <Route path="/book-ride/:rideId" element={<BookRide/>} />
        </Routes>
        </Layout>
    
</Router>
  );
}

export default App;
