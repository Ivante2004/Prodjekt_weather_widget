export interface WeatherData {
  main: {
    temp: number;
    temp_max: number;  
    temp_min: number;  
    pressure: number;   
    humidity: number;   
    feels_like: number; 
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number; 
    deg: number;   
  };
  sys: {
    sunrise: number; 
    sunset: number;  
  };
  name: string; 
}



export interface ForecastData {
  list: ForecastItem[]; 
}


export interface ForecastItem {
  dt: number; 
  dt_txt: string; 
  main: {
    temp: number;
    temp_max: number;  
    temp_min: number;  
    humidity: number;   
    pressure: number;   
    feels_like: number; 
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number; 
    deg: number;   
  };
  pop?: number; 
  sys?: {
    sunrise: number; 
    sunset: number;  
  };
}


