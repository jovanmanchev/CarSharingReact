import React from 'react';
import Profile from './components/PassengerProfile'; 
import Layout from './components/Layout';
import RidesList from './components/RideList';
import RidesWrapper from './components/RidesWrapper'
import RidesForDriver from './components/RidesForDriver';
import BookRide from './components/BookRide';
import DriverProfile from './components/DriverProfile';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Redirect } from 'react-router-dom';
import PassengerRequests from './components/PassengerRequests';
import 'bootstrap/dist/css/bootstrap.min.css';
import YourRides from './components/PassengerRides';
import PassengerUpcomingRides from './components/PassengerUpcomingRides';
import PassengerPastRides from './components/PassengerPastRides';
import HowItWorks from './components/HowItWorks';
import AboutUs from './components/AboutUs';
import Login from "./components/Login";
import Register from './components/Register';


function App() {
  return (
    <Router>
    <Layout>
        <Routes> 
              <Route path={`/passenger/:passengerId/requests`} element={<PassengerRequests/>} /> 
              <Route path="/passenger/:passengerId" element={<Profile />} />
              <Route path="/driver/:driverId" element={<DriverProfile />} />
              <Route path="/rides" element={<RidesWrapper />} />
              <Route path="/ridesForDriver/:driverId" element={<RidesForDriver />} />
              <Route path="/book-ride/:rideId" element={<BookRide/>} />
              <Route path="/your-rides/:passengerId/upcoming" element={<PassengerUpcomingRides/>} />
              <Route path="/your-rides/:passengerId/past" element={<PassengerPastRides/>} />
              <Route path="/your-rides/:passengerId" element={<PassengerUpcomingRides/>}/>
              <Route path="/how-it-works" element={<HowItWorks/>}/>
              <Route path="/about-us" element={<AboutUs/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
        </Routes>
        </Layout>
    
</Router>
  );
}

export default App;
