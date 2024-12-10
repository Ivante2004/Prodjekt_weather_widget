import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { WeatherData, ForecastData } from '../types'; 

const API_KEY = '7fadd29476dfee4528f7c3d671d61b0c'; 
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherData, string>({
      query: (city: string) => `weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`,
    }),
    getForecastByCity: builder.query<ForecastData, string>({
      query: (city: string) =>
        `forecast?q=${city}&appid=${API_KEY}&units=metric&lang=ru`,
    }),
  }),
});

export const { useGetWeatherByCityQuery, useGetForecastByCityQuery } = weatherApi;
