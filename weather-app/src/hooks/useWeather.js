import { useState } from 'react';
import { fetchWeatherData, fetchForecastData } from '../services/weatherService';

const useWeather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchWeatherData(city);
      setWeatherData(data);
      return data;
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchForecast = async (city) => {
    try {
      const data = await fetchForecastData(city);
      setForecastData(data);
      return data;
    } catch (err) {
      console.error('Forecast error:', err);
      // We don't set error here to not disrupt the main weather display
      setForecastData(null);
    }
  };

  return {
    weatherData,
    forecastData,
    loading,
    error,
    fetchWeather,
    fetchForecast
  };
};

export default useWeather;
