'use client';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import SearchBar from '../components/SearchBar';
import CityCard from '../components/CityCard';
import { RootState } from '../store/store';
import { Toaster } from 'react-hot-toast';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { setInitialState } from '../store/weatherSlice';
import { City } from '../types/weather';

const WeatherDashboard: React.FC = () => {
  const { cities } = useSelector((state: RootState) => state.weather);
  const dispatch = useDispatch();
  const [savedCities, setSavedCities] = useLocalStorage<City[]>('weatherCities', []);


  // Load saved cities on mount only
  React.useEffect(() => {
    if (savedCities.length > 0 && cities.length === 0) {
      dispatch(setInitialState({ cities: savedCities, loading: false, error: null }));
    }
  }, []); // Only run on mount

  // Save cities when they change (but not on initial load)
  React.useEffect(() => {
    if (cities.length > 0 || savedCities.length > 0) {
      setSavedCities(cities);
    }
  }, [cities, setSavedCities, savedCities.length]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Weather Dashboard</h1>
        <SearchBar />
        
        {cities.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>Add a city to get started!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map((city) => (
              <CityCard key={city.name} city={city} />
            ))}
          </div>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default function Home() {
  return (
    <Provider store={store}>
      <WeatherDashboard />
    </Provider>
  );
}
