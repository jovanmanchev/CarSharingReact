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
        <div className="filters">
            <h3>Departure time</h3>
            {Object.values(timeFilters).map(filter => (
                <div>
                <label key={filter}>
                    <input type="checkbox" checked={timeFilter === filter} onChange={() => handleTimeFilterChange(filter)} />
                    {filter}
                </label>
                </div>
            ))}
            <h3>Sort By</h3>
            <div>
                <div>
                    <input type="radio" name="sortOption" onChange={() => handleSortOptionChange('price')} />
                    By Price
                </div>
                <div>
                    <input type="radio" name="sortOption" onChange={() => handleSortOptionChange('earliest')} />
                    Earliest Departure
                </div>
            </div>
            <h3>Other</h3>
            {Object.entries(preferences).map(([key, value]) => (
                <div>
                <label key={key}>
                    <input
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
