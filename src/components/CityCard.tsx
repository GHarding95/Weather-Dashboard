import React from 'react';
import { useDispatch } from 'react-redux';
import { City } from '../types/weather';
import { removeCity, togglePinCity } from '../store/weatherSlice';
import { useWeatherData } from '../hooks/useWeatherData';

interface CityCardProps {
  city: City;
}

const CityCard: React.FC<CityCardProps> = ({ city }) => {
  const dispatch = useDispatch();
  const { loading } = useWeatherData(city.name);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (city.error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{city.name}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch(togglePinCity(city.name))}
              className={`p-2 rounded-full ${city.isPinned ? 'text-yellow-500' : 'text-gray-400'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
            </button>
            <button
              onClick={() => dispatch(removeCity(city.name))}
              className="p-2 text-red-500 hover:text-red-700 rounded-full"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        <p className="text-red-500">{city.error}</p>
      </div>
    );
  }

  if (!city.weatherData) {
    return null;
  }

  const { current, location } = city.weatherData;

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 cursor-pointer ${city.isPinned ? 'border-2 border-yellow-400' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">{location.name}</h2>
          <p className="text-gray-600">{location.country}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => dispatch(togglePinCity(city.name))}
            className={`p-2 rounded-full ${city.isPinned ? 'text-yellow-500' : 'text-gray-400'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
          </button>
          <button
            onClick={() => dispatch(removeCity(city.name))}
            className="p-2 text-red-500 hover:text-red-700 rounded-full"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-4xl font-bold">{current.temp_c}°C</p>
          <p className="text-gray-600">{current.condition.text}</p>
        </div>
        <img src={current.condition.icon} alt={current.condition.text} className="w-16 h-16" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-gray-600">Humidity</p>
          <p className="font-semibold">{current.humidity}%</p>
        </div>
        <div>
          <p className="text-gray-600">Wind Speed</p>
          <p className="font-semibold">{current.wind_kph} km/h</p>
        </div>
        <div>
          <p className="text-gray-600">Feels Like</p>
          <p className="font-semibold">{current.feelslike_c}°C</p>
        </div>
        <div>
          <p className="text-gray-600">Pressure</p>
          <p className="font-semibold">{current.pressure_mb} mb</p>
        </div>
      </div>
    </div>
  );
};

export default CityCard; 