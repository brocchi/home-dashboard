'use client';

import { useState, useEffect } from 'react';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
    feels_like: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  name: string;
}

export default function Weather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
        const city = 'São Paulo';
        
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load weather data');
        setLoading(false);
      }
    };

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-blue-200 rounded w-3/4 mb-4"></div>
        <div className="h-8 bg-blue-200 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600">{error}</div>
    );
  }

  if (!weather) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-blue-800">Weather</h2>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-blue-900">{Math.round(weather.main.temp)}°C</p>
          <p className="text-blue-700 capitalize">{weather.weather[0].description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-blue-700">Feels like: {Math.round(weather.main.feels_like)}°C</p>
          <p className="text-sm text-blue-700">Humidity: {weather.main.humidity}%</p>
        </div>
      </div>
    </div>
  );
} 