import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCity } from '../store/weatherSlice';
import { toast } from 'react-hot-toast';
import axios from 'axios';

const SearchBar: React.FC = () => {
  const [cityName, setCityName] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cityName.trim()) {
      try {
        const response = await axios.get(
          `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${cityName.trim()}`
        );
        
        if (!response.data) {
          toast.error('City not found. Please try a valid city name.');
          return;
        }
        
        dispatch(addCity(cityName.trim()));
        setCityName('');
      } catch {
        toast.error('Error searching for city. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto mb-8 px-2 sm:px-0" role="form">
      <div className="flex flex-col min-[375px]:flex-row gap-2">
        <input
          type="text"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          placeholder="Enter city name..."
          className="w-full min-[375px]:flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <button
          type="submit"
          className="w-full min-[375px]:w-auto px-3 py-2 min-[375px]:px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer text-sm sm:text-base whitespace-nowrap"
        >
          Add City
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 