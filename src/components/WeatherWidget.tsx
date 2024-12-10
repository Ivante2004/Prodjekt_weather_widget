import React, { useState } from 'react';
import { TextField, Box, Typography, Modal, IconButton, Grid } from '@mui/material';
import { Search as SearchIcon, Refresh as RefreshIcon } from '@mui/icons-material';
import styles from './WeatherWidget.module.scss';
import { useGetWeatherByCityQuery, useGetForecastByCityQuery } from '../services/weatherApi';
import { ForecastItem } from '../types';

const WeatherWidget: React.FC = () => {
  const [city, setCity] = useState<string>('Саранск');
  const [selectedDay, setSelectedDay] = useState<ForecastItem | null>(null);
  const [fullDayData, setFullDayData] = useState<ForecastItem[]>([]);

  const { data: weatherData, error: weatherError, isLoading: isWeatherLoading } = useGetWeatherByCityQuery(city);
  const { data: forecastData, isLoading: isForecastLoading } = useGetForecastByCityQuery(city);

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const handleDayClick = (day: ForecastItem) => {
    if (forecastData) {
      const dateKey = day.dt_txt.split(' ')[0];
      const fullDayData = forecastData.list.filter((forecast: ForecastItem) => forecast.dt_txt.split(' ')[0] === dateKey);
      setFullDayData(fullDayData);
    }
    setSelectedDay(day);
  };

  const handleClose = () => {
    setSelectedDay(null);
    setFullDayData([]);
  };

  const uniqueDays: ForecastItem[] = [];
  const seenDates = new Set();

  if (forecastData) {
    forecastData.list.forEach((forecast: ForecastItem) => {
      const dateKey = forecast.dt_txt.split(' ')[0];
      if (!seenDates.has(dateKey)) {
        seenDates.add(dateKey);
        uniqueDays.push(forecast);
      }
    });
  }

  return (
    <div className={styles.container}>
      <Box p={3} textAlign="center" flex="1">
        <Typography variant="h4" component="h1" style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}>
          Погода сегодня
        </Typography>

        <Box display="flex" justifyContent="center" alignItems="center" mt={2}>
          <TextField
            variant="outlined"
            value={city}
            onChange={handleCityChange}
            placeholder="Введите город"
            style={{ width: '60%' }}
          />
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <IconButton aria-label="refresh">
            <RefreshIcon />
          </IconButton>
        </Box>

        {isWeatherLoading && <Typography>Загрузка...</Typography>}
        {weatherError && <Typography>Ошибка загрузки данных</Typography>}
        {weatherData && (
          <Box mt={3}>
            <Typography variant="h1" style={{ fontWeight: 'bold', fontSize: '48px' }}>
              {Math.round(weatherData.main.temp)}°C
            </Typography>
            <Typography variant="h5">{weatherData.weather[0].description}</Typography>
            <img
              src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
              style={{ width: '100px', height: '100px' }}
            />
            <Typography variant="h6" style={{ marginTop: '10px' }}>
              {weatherData.name}
            </Typography>
            <Typography>Влажность: {weatherData.main.humidity}%</Typography>
            <Typography>Ветер: {weatherData.wind.speed} м/с</Typography>
          </Box>
        )}

        {isForecastLoading && <Typography>Загрузка прогноза...</Typography>}

        {uniqueDays.length > 0 && (
          <Box mt={3} display="flex" justifyContent="space-around" flexWrap="wrap">
            {uniqueDays.map((forecast: ForecastItem) => (
              <Box
                key={forecast.dt}
                textAlign="center"
                onClick={() => handleDayClick(forecast)}
                style={{ cursor: 'pointer', background: '#ffffff', borderRadius: '8px', padding: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}
              >
                <Typography>{new Date(forecast.dt_txt).toLocaleDateString('ru-RU')}</Typography>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                  alt={forecast.weather[0].description}
                />
                <Typography>{Math.round(forecast.main.temp)}°C</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>

      <Modal open={!!selectedDay} onClose={handleClose}>
        <Box p={4} bgcolor="white" borderRadius={4} boxShadow={3} margin="auto" maxWidth={800} textAlign="center">
          {selectedDay && (
            <>
              <Typography variant="h5">{new Date(selectedDay.dt_txt).toLocaleDateString('ru-RU')}</Typography>
              <Grid container spacing={2} mt={2}>
                {fullDayData.map((data: ForecastItem) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={data.dt}>
                    <Box p={2} border="1px solid #ddd" borderRadius="10px" textAlign="center">
                      <Typography variant="h6">{new Date(data.dt_txt).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</Typography>
                      <Typography>{Math.round(data.main.temp)}°C - {data.weather[0].description}</Typography>
                      <Typography>Влажность: {data.main.humidity}%</Typography>
                      <Typography>Ветер: {data.wind.speed} м/с</Typography>
                      <Typography>Давление: {data.main.pressure} гПа</Typography>
                      <Typography>Точка росы: {data.main.feels_like}°C</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default WeatherWidget;
