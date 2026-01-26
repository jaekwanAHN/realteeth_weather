export interface WeatherData {
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg: number;
  };
  dt: number;
  name: string;
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  dt_txt: string;
}

export interface ForecastData {
  cod: string;
  list: ForecastItem[];
  city: {
    name: string;
    country: string;
  };
}

export interface SimpleWeatherData {
  temp: number;
  temp_min: number;
  temp_max: number;
  icon: string;
  description: string;
}


export interface CurrentWeatherData {
  weather: any;
  forecast: any;
}
