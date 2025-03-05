import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SearchBar from '../SearchBar';
import weatherReducer from '../../store/weatherSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      weather: weatherReducer,
    },
  });
};

describe('SearchBar', () => {
  it('renders search input and button', () => {
    render(
      <Provider store={createTestStore()}>
        <SearchBar />
      </Provider>
    );

    expect(screen.getByPlaceholderText('Enter city name...')).toBeInTheDocument();
    expect(screen.getByText('Add City')).toBeInTheDocument();
  });

  it('clears input after adding a city', () => {
    render(
      <Provider store={createTestStore()}>
        <SearchBar />
      </Provider>
    );

    const input = screen.getByPlaceholderText('Enter city name...');
    const button = screen.getByText('Add City');

    fireEvent.change(input, { target: { value: 'London' } });
    fireEvent.click(button);

    expect(input).toHaveValue('');
  });

  it('does not add empty city names', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <SearchBar />
      </Provider>
    );

    const button = screen.getByText('Add City');
    fireEvent.click(button);

    const state = store.getState();
    expect(state.weather.cities).toHaveLength(0);
  });
}); 