import React, { useState } from 'react';
import './Weather.css';

const Weather = () => {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeatherData = async () => {
        const WAPI = `https://api.weatherapi.com/v1/current.json?key=cc7ca3f16d184948b6c150827240606&q=${city},Pakistan`;
        try {
            const response = await fetch(WAPI);
            if (response.ok) {
                const data = await response.json();
                setWeather({
                    city: city,
                    temperature: data.current.temp_c,
                    humidity: data.current.humidity,
                    pressure: data.current.pressure_mb,
                    wind_speed: data.current.wind_kph,
                    condition: data.current.condition.text,
                    icon: data.current.condition.icon,
                });
                setError('');
            } else {
                setError('Weather data not found');
                setWeather(null);
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            setError('Error fetching weather data');
            setWeather(null);
        }
    };

    return (
        <div className="weather-container">
            <input 
                type="text" 
                value={city} 
                onChange={(e) => setCity(e.target.value)} 
                placeholder="Enter city in Pakistan" 
                className="weather-input"
            />
            <button onClick={fetchWeatherData} className="weather-button">Get Weather</button>
            {error && <p className="error">{error}</p>}
            {weather && (
                <div className="weather-info">
                    <h2>Weather in {weather.city}</h2>
                    <img src={weather.icon} alt={weather.condition} />
                    <p>Condition: {weather.condition}</p>
                    <p>Temperature: {weather.temperature} °C</p>
                    <p>Humidity: {weather.humidity} %</p>
                    <p>Pressure: {weather.pressure} hPa</p>
                    <p>Wind Speed: {weather.wind_speed} kph</p>
                </div>
            )}
        </div>
    );
};

export default Weather;
