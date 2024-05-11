import React from 'react';
import RidesList from './RideList'; 
import Filters from './Filters'; 
import { FiltersProvider } from './FiltersContext';
import "../styles/ridesWrapper.css"
const MainComponent = () => {
    return (
        <FiltersProvider>
        <div className="main-container">
            <Filters />
            <RidesList />
        </div>
        </FiltersProvider>
    );
};

export default MainComponent;
