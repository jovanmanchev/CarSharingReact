import React from 'react';
import { useFilters } from './FiltersContext';

const timeFilters = {
    BEFORE_6: "before 6:00",
    FROM_6_TO_12: "6:00-12:00",
    FROM_12_TO_18: "12:00-18:00",
    AFTER_18: "after 18:00"
};

const Filters = () => {
    const { timeFilter, handleTimeFilterChange,handleSortOptionChange, togglePreference, preferences } = useFilters();


    return (
        <div className="filters mx-5">
            <h4><b>Departure time</b></h4>
            {Object.values(timeFilters).map(filter => (
                <div>
                <label key={filter}>
                    <input className='m-2' type="checkbox" checked={timeFilter === filter} onChange={() => handleTimeFilterChange(filter)} />
                    {filter}
                </label>
                </div>
            ))}
            <h4><b>Sort By</b></h4>
            <div>
                <div>
                    <input className='m-2' type="radio" name="sortOption" onChange={() => handleSortOptionChange('price')} />
                    By Price
                </div>
                <div>
                    <input className='m-2' type="radio" name="sortOption" onChange={() => handleSortOptionChange('earliest')} />
                    Earliest Departure
                </div>
            </div>
            <h4><b>Other</b></h4>
            {Object.entries(preferences).map(([key, value]) => (
                <div>
                <label key={key}>
                    <input
                        className='m-2'
                        type="checkbox"
                        checked={value}
                        onChange={() => togglePreference(key)}
                    />
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                </div>
            ))}
        </div>
    );
};

export default Filters;
