import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCity } from '../store/weatherSlice';
import { toast } from 'react-hot-toast';
import { RootState } from '../store/store';

const SearchBar: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();
  const cities = useSelector((state: RootState) => state.weather.cities);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      // Check for duplicate cities
      const isDuplicate = cities.some(city => 
        city.name.toLowerCase() === cityName.trim().toLowerCase()
      );

      if (isDuplicate) {
        toast.error('This city is already added to your dashboard.');
        return;
      }

      try {
        const response = await fetch(
          `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName.trim()}`
        );
        
        if (!response.ok) {
          toast.error('City not found. Please try a valid city name.');
          return;
        }
        
        dispatch(addCity(cityName.trim()));
        setCityName('');
      } catch (error) {
        toast.error('Error searching for city. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8">
      <div className="flex gap-2">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name..."
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
        >
          Add City
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 