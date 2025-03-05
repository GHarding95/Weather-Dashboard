export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    localtime: string;
  };
  current: {
    temp_c: number;
    temp_f: number;
    condition: {
      text: string;
      icon: string;
    };
    humidity: number;
    wind_kph: number;
    wind_dir: string;
    pressure_mb: number;
    feelslike_c: number;
    uv: number;
  };
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    mintemp_c: number;
    avgtemp_c: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    avghumidity: number;
    condition: {
      text: string;
      icon: string;
    };
  };
  hour: HourForecast[];
}

export interface HourForecast {
  time: string;
  temp_c: number;
  condition: {
    text: string;
    icon: string;
  };
  humidity: number;
  wind_kph: number;
  chance_of_rain: number;
}

export interface City {
  name: string;
  isPinned: boolean;
  weatherData?: WeatherData;
  error?: string;
} 