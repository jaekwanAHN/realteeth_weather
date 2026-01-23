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
  dt: number; // 데이터 수신 시간 (Unix Timestamp)
  name: string; // 지역명
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
  list: ForecastItem[]; // 3시간 간격의 예보 리스트
  city: {
    name: string;
    country: string;
  };
}

export interface SimpleWeatherData  {
  temp: number;
  temp_min: number;
  temp_max: number;
  icon: string;
  description: string;
};

// todo any Type 제거
export interface CurrentWeatherData  {
  weather: any; // 또는 WeatherData 타입으로 정의
  forecast: any; // 또는 ForecastData 타입으로 정의
};