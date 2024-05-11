import React from 'react';
import Profile from './components/PassengerProfile'; 
import Layout from './components/Layout';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Router>
    <Layout>
        <Routes>
           
              <Route path="/passenger/:passengerId" element={<Profile />} />
           

        </Routes>
        </Layout>
    
</Router>
  );
}

export default App;
