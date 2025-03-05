import weatherReducer, {
  addCity,
  removeCity,
  togglePinCity,
  updateCityWeather,
  setCityError,
  setLoading,
  setError,
  reorderCities,
} from '../store/weatherSlice';
import { WeatherData } from '../types/weather';

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
      icon: 'test-icon.png',
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
            icon: 'test-icon.png',
          },
        },
        hour: [
          {
            time: '2024-03-05 12:00',
            temp_c: 20,
            condition: {
              text: 'Sunny',
              icon: 'test-icon.png',
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

describe('weatherSlice', () => {
  const initialState = {
    cities: [],
    loading: false,
    error: null,
  };

  it('should handle initial state', () => {
    expect(weatherReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addCity', () => {
    const actual = weatherReducer(initialState, addCity('London'));
    expect(actual.cities).toHaveLength(1);
    expect(actual.cities[0].name).toBe('London');
    expect(actual.cities[0].isPinned).toBe(false);
  });

  it('should handle removeCity', () => {
    const stateWithCity = {
      ...initialState,
      cities: [{ name: 'London', isPinned: false }],
    };
    const actual = weatherReducer(stateWithCity, removeCity('London'));
    expect(actual.cities).toHaveLength(0);
  });

  it('should handle togglePinCity', () => {
    const stateWithCity = {
      ...initialState,
      cities: [{ name: 'London', isPinned: false }],
    };
    const actual = weatherReducer(stateWithCity, togglePinCity('London'));
    expect(actual.cities[0].isPinned).toBe(true);
  });

  it('should handle updateCityWeather', () => {
    const stateWithCity = {
      ...initialState,
      cities: [{ name: 'London', isPinned: false }],
    };
    const actual = weatherReducer(
      stateWithCity,
      updateCityWeather({ cityName: 'London', weatherData: mockWeatherData })
    );
    expect(actual.cities[0].weatherData).toEqual(mockWeatherData);
    expect(actual.cities[0].error).toBeUndefined();
  });

  it('should handle setCityError', () => {
    const stateWithCity = {
      ...initialState,
      cities: [{ name: 'London', isPinned: false }],
    };
    const error = 'City not found';
    const actual = weatherReducer(
      stateWithCity,
      setCityError({ cityName: 'London', error })
    );
    expect(actual.cities[0].error).toBe(error);
  });

  it('should handle setLoading', () => {
    const actual = weatherReducer(initialState, setLoading(true));
    expect(actual.loading).toBe(true);
  });

  it('should handle setError', () => {
    const error = 'Failed to fetch weather data';
    const actual = weatherReducer(initialState, setError(error));
    expect(actual.error).toBe(error);
  });

  it('should handle reorderCities', () => {
    const stateWithCities = {
      ...initialState,
      cities: [
        { name: 'London', isPinned: false },
        { name: 'Paris', isPinned: false },
        { name: 'New York', isPinned: false },
      ],
    };
    const actual = weatherReducer(
      stateWithCities,
      reorderCities({ sourceIndex: 0, destinationIndex: 2 })
    );
    expect(actual.cities[0].name).toBe('Paris');
    expect(actual.cities[1].name).toBe('New York');
    expect(actual.cities[2].name).toBe('London');
  });
}); 