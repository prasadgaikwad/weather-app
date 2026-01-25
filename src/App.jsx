import { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import CurrentWeather from './components/CurrentWeather';
import ChartControls from './components/ChartControls';
import TemperatureChart from './components/TemperatureChart';
import LoadingOverlay from './components/LoadingOverlay';
import ErrorDisplay from './components/ErrorDisplay';
import { fetchWeatherData } from './utils/api';

// Default location: Dallas, US
// Default location: Dallas, US
const DEFAULT_LOCATION = {
  lat: 32.7767,
  lon: -96.7970,
  name: 'Dallas, Texas, US',
};

export default function App() {
  // Initialize state from localStorage if available
  const [location, setLocation] = useState(() => {
    const saved = localStorage.getItem('weather-app-location');
    return saved ? JSON.parse(saved) : null; // Start null to differentiate "no saved data" from "default"
  });

  const [weatherData, setWeatherData] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null);

  const [daysBuffer, setDaysBuffer] = useState(() => {
    const saved = localStorage.getItem('weather-app-days');
    return saved ? parseInt(saved, 10) : 1; // Default to 1 day as requested
  });

  const [unit, setUnit] = useState(() => {
    return localStorage.getItem('weather-app-unit') || 'celsius';
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Persist state changes
  useEffect(() => {
    if (location) {
      localStorage.setItem('weather-app-location', JSON.stringify(location));
    }
  }, [location]);

  useEffect(() => {
    localStorage.setItem('weather-app-days', daysBuffer.toString());
  }, [daysBuffer]);

  useEffect(() => {
    localStorage.setItem('weather-app-unit', unit);
  }, [unit]);

  // Fetch weather data when location or daysBuffer changes
  const loadWeatherData = useCallback(async () => {
    // If we don't have a location yet (initial load with no saved data), don't fetch
    if (!location) return;

    setLoading(true);
    setError('');

    try {
      const data = await fetchWeatherData(location.lat, location.lon, daysBuffer);
      setWeatherData(data.daily);
      setCurrentWeather(data.current);
    } catch (err) {
      console.error('Failed to fetch weather:', err);
      setError(err.message || 'Failed to fetch weather data');
      setWeatherData([]);
      setCurrentWeather(null);
    } finally {
      setLoading(false);
    }
  }, [location, daysBuffer]);

  // Get user's location on mount handles the fallback logic
  useEffect(() => {
    const initLocation = async () => {
      // If we already have a saved location, use it
      if (location) return;

      if (!navigator.geolocation) {
        setLocation(DEFAULT_LOCATION);
        return;
      }

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: false,
            timeout: 10000,
            maximumAge: 300000, // 5 minutes cache
          });
        });

        const { latitude, longitude } = position.coords;
        let locationName = `${latitude.toFixed(4)}°, ${longitude.toFixed(4)}°`;

        // Reverse geocode to get city name using BigDataCloud (free, no API key needed)
        try {
          const response = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          if (response.ok) {
            const data = await response.json();
            if (data.city || data.locality) {
              const city = data.city || data.locality;
              const region = data.principalSubdivision || '';
              const country = data.countryName || '';
              locationName = [city, region, country].filter(Boolean).join(', ');
            }
          }
        } catch {
          // Ignore reverse geocoding errors, use coordinates
        }

        setLocation({
          lat: latitude,
          lon: longitude,
          name: locationName,
        });
      } catch (err) {
        // User denied or error, use default location
        console.log('Geolocation unavailable, using default location');
        setLocation(DEFAULT_LOCATION);
      }
    };

    initLocation();
  }, []); // Only run on mount

  // Fetch weather when location (once set) or daysBuffer changes
  useEffect(() => {
    if (location) {
      loadWeatherData();
    }
  }, [loadWeatherData, location]);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  const handleReset = () => {
    setLocation(DEFAULT_LOCATION);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-900 dark:bg-slate-900 light:bg-slate-100 transition-colors duration-300">
      {/* Safe area padding for iOS */}
      <div className="pt-safe-top pb-safe-bottom">
        <Header
          location={location || DEFAULT_LOCATION}
          onLocationChange={handleLocationChange}
          onRefresh={() => loadWeatherData()}
        />

        <main className="py-6">
          {error ? (
            <ErrorDisplay error={error} onReset={handleReset} />
          ) : (
            <>
              <CurrentWeather currentWeather={currentWeather} />

              <ChartControls
                daysBuffer={daysBuffer}
                onDaysChange={setDaysBuffer}
                unit={unit}
                onUnitChange={setUnit}
              />

              <TemperatureChart weatherData={weatherData} unit={unit} />
            </>
          )}
        </main>

        {/* Footer with attribution */}
        <footer className="py-6 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-500 light:text-slate-400">
            Powered by{' '}
            <a
              href="https://open-meteo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-500 hover:text-sky-400 transition-colors"
            >
              Open-Meteo
            </a>
          </p>
        </footer>
      </div>

      {loading && <LoadingOverlay />}
    </div>
  );
}
