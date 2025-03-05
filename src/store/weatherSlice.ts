import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, WeatherData } from '../types/weather';

interface WeatherState {
  cities: City[];
  loading: boolean;
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  loading: false,
  error: null,
};

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    addCity: (state, action: PayloadAction<string>) => {
      const newCity: City = {
        name: action.payload,
        isPinned: false,
      };
      state.cities.push(newCity);
    },
    removeCity: (state, action: PayloadAction<string>) => {
      state.cities = state.cities.filter(city => city.name !== action.payload);
    },
    togglePinCity: (state, action: PayloadAction<string>) => {
      const city = state.cities.find(city => city.name === action.payload);
      if (city) {
        city.isPinned = !city.isPinned;
      }
    },
    updateCityWeather: (state, action: PayloadAction<{ cityName: string; weatherData: WeatherData }>) => {
      const city = state.cities.find(city => city.name === action.payload.cityName);
      if (city) {
        city.weatherData = action.payload.weatherData;
        city.error = undefined;
      }
    },
    setCityError: (state, action: PayloadAction<{ cityName: string; error: string }>) => {
      const city = state.cities.find(city => city.name === action.payload.cityName);
      if (city) {
        city.error = action.payload.error;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addCity,
  removeCity,
  togglePinCity,
  updateCityWeather,
  setCityError,
  setLoading,
  setError,
} = weatherSlice.actions;

export default weatherSlice.reducer; 