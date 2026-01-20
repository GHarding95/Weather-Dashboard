import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import CityCard from '../components/CityCard';
import weatherReducer from '../store/weatherSlice';
import { useWeatherData } from '../hooks/useWeatherData';
import { WeatherData } from '../types/weather';
import { addCity, updateCityWeather } from '../store/weatherSlice';

// Mock the useWeatherData hook
jest.mock('../hooks/useWeatherData');
const mockedUseWeatherData = useWeatherData as jest.MockedFunction<typeof useWeatherData>;

const mockWeatherData: WeatherData = {
  location: {
    name: 'London',
    region: 'City of London, Greater London',
    country: 'UK',
    lat: 51.52,
    lon: -0.11,
    localtime: '2024-03-05 12:00',
  },
  current: {
    temp_c: 20,
    temp_f: 68,
    condition: {
      text: 'Sunny',
      icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
    },
    humidity: 65,
    wind_kph: 10,
    wind_dir: 'N',
    pressure_mb: 1015,
    feelslike_c: 18,
    uv: 5,
  },
  forecast: {
    forecastday: [
      {
        date: '2024-03-05',
        date_epoch: 1709654400,
        day: {
          maxtemp_c: 22,
          mintemp_c: 15,
          avgtemp_c: 19,
          maxwind_kph: 12,
          totalprecip_mm: 0,
          avghumidity: 60,
          condition: {
            text: 'Partly cloudy',
            icon: 'https://cdn.weatherapi.com/weather/64x64/day/116.png',
          },
        },
        hour: [
          {
            time: '2024-03-05 12:00',
            temp_c: 20,
            condition: {
              text: 'Sunny',
              icon: 'https://cdn.weatherapi.com/weather/64x64/day/113.png',
            },
            humidity: 65,
            wind_kph: 10,
            chance_of_rain: 0,
          },
        ],
      },
    ],
  },
};

const createTestStore = () => {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });
};

describe('CityCard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    mockedUseWeatherData.mockReturnValue({ loading: true });

    render(
      <Provider store={createTestStore()}>
        <CityCard city={{ name: 'London', isPinned: false }} />
      </Provider>
    );

    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  it('renders error state', () => {
    mockedUseWeatherData.mockReturnValue({ loading: false });

    render(
      <Provider store={createTestStore()}>
        <CityCard city={{ name: 'London', isPinned: false, error: 'City not found' }} />
      </Provider>
    );

    expect(screen.getByText('City not found')).toBeInTheDocument();
  });

  it('renders weather data correctly', () => {
    mockedUseWeatherData.mockReturnValue({ loading: false });

    render(
      <Provider store={createTestStore()}>
        <CityCard city={{ name: 'London', isPinned: false, weatherData: mockWeatherData }} />
      </Provider>
    );

    expect(screen.getByText('London')).toBeInTheDocument();
    expect(screen.getByText('UK')).toBeInTheDocument();
    expect(screen.getByText('20°C')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('65%')).toBeInTheDocument();
    expect(screen.getByText('10 km/h')).toBeInTheDocument();
    expect(screen.getByText('18°C')).toBeInTheDocument();
    expect(screen.getByText('1015 mb')).toBeInTheDocument();
  });

  it('handles pin/unpin functionality', () => {
    const store = createTestStore();
    mockedUseWeatherData.mockReturnValue({ loading: false });

    // Initialize store with the city
    store.dispatch(addCity('London'));
    store.dispatch(updateCityWeather({ cityName: 'London', weatherData: mockWeatherData }));

    render(
      <Provider store={store}>
        <CityCard city={{ name: 'London', isPinned: false, weatherData: mockWeatherData }} />
      </Provider>
    );

    const pinButton = screen.getByRole('button', { name: /pin/i });
    fireEvent.click(pinButton);

    const state = store.getState();
    expect(state.weather.cities[0].isPinned).toBe(true);
  });

  it('handles remove functionality', () => {
    const store = createTestStore();
    mockedUseWeatherData.mockReturnValue({ loading: false });

    // Initialize store with the city
    store.dispatch(addCity('London'));
    store.dispatch(updateCityWeather({ cityName: 'London', weatherData: mockWeatherData }));

    render(
      <Provider store={store}>
        <CityCard city={{ name: 'London', isPinned: false, weatherData: mockWeatherData }} />
      </Provider>
    );

    const removeButton = screen.getByRole('button', { name: /remove/i });
    fireEvent.click(removeButton);

    const state = store.getState();
    expect(state.weather.cities).toHaveLength(0);
  });
}); 