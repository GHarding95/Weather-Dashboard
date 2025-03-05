import React from 'react';
import { render } from '@testing-library/react';
import { screen, fireEvent, waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../components/SearchBar';
import weatherReducer from '../store/weatherSlice';
import axios from 'axios';

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Mock environment variables
process.env.NEXT_PUBLIC_WEATHER_API_KEY = 'test-api-key';

const createTestStore = () => {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });
};

describe('SearchBar', () => {
  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
  });

  it('renders search input and button', () => {
    render(
      <Provider store={createTestStore()}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByText('Add City')).toBeInTheDocument();
  });

  it('clears input after adding a city', async () => {
    // Mock successful API response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        location: {
          name: 'London',
          country: 'UK',
        },
        current: {
          temp_c: 20,
          condition: {
            text: 'Sunny',
            icon: 'test-icon.png',
          },
        },
      },
    });

    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter city name...');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.submit(form);

    // Wait for the input to be cleared and the city to be added
    await waitFor(() => {
      expect(input).toHaveValue('');
      const state = store.getState();
      expect(state.weather.cities).toHaveLength(1);
      expect(state.weather.cities[0].name).toBe('London');
    });
  });

  it('does not add empty city names', async () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const form = screen.getByRole('form');
    fireEvent.submit(form);

    // Wait for any async operations to complete
    await waitFor(() => {
      const state = store.getState();
      expect(state.weather.cities).toHaveLength(0);
    });
  });
}); 