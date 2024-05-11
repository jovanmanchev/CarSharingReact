import React from 'react';
import Profile from './components/PassengerProfile'; 
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <div>
        <Routes>
           
            <Route path="/passenger/:passengerId" element={<Profile />} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
