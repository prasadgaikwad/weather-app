const BASE_URL = 'https://api.open-meteo.com/v1';

/**
 * Fetch weather data from Open-Meteo API
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @param {number} daysBuffer - Number of days before/after today
 * @returns {Promise<Object>} Weather data
 */
export async function fetchWeatherData(lat, lon, daysBuffer) {
    const url = new URL(`${BASE_URL}/forecast`);
    url.searchParams.set('latitude', lat);
    url.searchParams.set('longitude', lon);
    url.searchParams.set('daily', 'temperature_2m_max,temperature_2m_min,weathercode');
    url.searchParams.set('current', 'temperature_2m,weather_code');
    url.searchParams.set('timezone', 'auto');
    url.searchParams.set('past_days', daysBuffer);
    url.searchParams.set('forecast_days', daysBuffer + 1);
    url.searchParams.set('temperature_unit', 'celsius');

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`);
    }

    const data = await response.json();

    // Transform data into a more usable format
    const dailyData = data.daily.time.map((date, index) => ({
        date,
        maxTemp: data.daily.temperature_2m_max[index],
        minTemp: data.daily.temperature_2m_min[index],
        weatherCode: data.daily.weathercode[index],
    }));

    const currentWeather = {
        temp: data.current.temperature_2m,
        code: data.current.weather_code,
    };

    return {
        daily: dailyData,
        current: currentWeather,
        timezone: data.timezone,
    };
}

/**
 * Search for a city using Open-Meteo Geocoding API
 * @param {string} query - City name to search
 * @returns {Promise<Object|null>} Location data or null if not found
 */
export async function searchCity(query) {
    const url = new URL('https://geocoding-api.open-meteo.com/v1/search');
    url.searchParams.set('name', query);
    url.searchParams.set('count', '1');
    url.searchParams.set('language', 'en');
    url.searchParams.set('format', 'json');

    const response = await fetch(url.toString());

    if (!response.ok) {
        throw new Error(`Geocoding API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        return null;
    }

    const result = data.results[0];
    return {
        lat: result.latitude,
        lon: result.longitude,
        name: result.name,
        country: result.country,
        admin1: result.admin1, // State/Region
    };
}
