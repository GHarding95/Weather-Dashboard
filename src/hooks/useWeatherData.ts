import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { updateCityWeather, setCityError } from '../store/weatherSlice';

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
const BASE_URL = 'https://api.weatherapi.com/v1';

export const useWeatherData = (cityName: string) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}/forecast.json`, {
          params: {
            key: API_KEY,
            q: cityName,
            days: 5,
            aqi: 'no',
            alerts: 'no',
          },
        });

        dispatch(updateCityWeather({ cityName, weatherData: response.data }));
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch weather data';
        dispatch(setCityError({ cityName, error: errorMessage }));
      } finally {
        setLoading(false);
      }
    };

    if (cityName) {
      fetchWeatherData();
    }
  }, [cityName, dispatch]);

  return { loading };
}; 