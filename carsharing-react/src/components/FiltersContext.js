import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFilters = () => useContext(FiltersContext);

export const FiltersProvider = ({ children }) => {
    const [timeFilter, setTimeFilter] = useState('');

    const [sortOption, setSortOption] = useState('');

    const [preferences, setPreferences] = useState({
        chattiness: false,
        pets: false,
        smoking: false,
        music: false
    });

    const handleTimeFilterChange = (filter) => {
        setTimeFilter(current => current === filter ? '' : filter);
    };
    const handleSortOptionChange = (sort) => {
        setSortOption(current => current === sort ? '' : sort)
    }

    const togglePreference = (preference) => {
        setPreferences(prev => ({
            ...prev,
            [preference]: !prev[preference]
        }));
    };

    return (
        <FiltersContext.Provider value={{
            timeFilter, 
            handleTimeFilterChange,
            sortOption, 
            handleSortOptionChange,
            setSortOption,
            preferences, togglePreference 
        }}>
            {children}
        </FiltersContext.Provider>
    );
};
