// Weather code to description and icon mapping based on WMO codes
// https://open-meteo.com/en/docs

export const weatherDescriptions = {
    0: 'Clear sky',
    1: 'Mainly clear',
    2: 'Partly cloudy',
    3: 'Overcast',
    45: 'Foggy',
    48: 'Depositing rime fog',
    51: 'Light drizzle',
    53: 'Moderate drizzle',
    55: 'Dense drizzle',
    56: 'Light freezing drizzle',
    57: 'Dense freezing drizzle',
    61: 'Slight rain',
    63: 'Moderate rain',
    65: 'Heavy rain',
    66: 'Light freezing rain',
    67: 'Heavy freezing rain',
    71: 'Slight snow',
    73: 'Moderate snow',
    75: 'Heavy snow',
    77: 'Snow grains',
    80: 'Slight rain showers',
    81: 'Moderate rain showers',
    82: 'Violent rain showers',
    85: 'Slight snow showers',
    86: 'Heavy snow showers',
    95: 'Thunderstorm',
    96: 'Thunderstorm with slight hail',
    99: 'Thunderstorm with heavy hail',
};

// Map weather codes to Lucide icon names
export const weatherIcons = {
    0: 'Sun',
    1: 'Sun',
    2: 'CloudSun',
    3: 'Cloud',
    45: 'CloudFog',
    48: 'CloudFog',
    51: 'CloudDrizzle',
    53: 'CloudDrizzle',
    55: 'CloudDrizzle',
    56: 'CloudDrizzle',
    57: 'CloudDrizzle',
    61: 'CloudRain',
    63: 'CloudRain',
    65: 'CloudRain',
    66: 'CloudRain',
    67: 'CloudRain',
    71: 'CloudSnow',
    73: 'CloudSnow',
    75: 'CloudSnow',
    77: 'CloudSnow',
    80: 'CloudRain',
    81: 'CloudRain',
    82: 'CloudRain',
    85: 'CloudSnow',
    86: 'CloudSnow',
    95: 'CloudLightning',
    96: 'CloudLightning',
    99: 'CloudLightning',
};

export function getWeatherDescription(code) {
    return weatherDescriptions[code] || 'Unknown';
}

export function getWeatherIconName(code) {
    return weatherIcons[code] || 'Cloud';
}
