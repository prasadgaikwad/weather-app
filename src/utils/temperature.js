/**
 * Convert Celsius to Fahrenheit
 * @param {number} celsius - Temperature in Celsius
 * @returns {number} Temperature in Fahrenheit
 */
export function celsiusToFahrenheit(celsius) {
    return (celsius * 9) / 5 + 32;
}

/**
 * Format temperature based on unit preference
 * @param {number} tempCelsius - Temperature in Celsius (from API)
 * @param {string} unit - 'celsius' or 'fahrenheit'
 * @param {boolean} includeUnit - Whether to include the unit symbol
 * @returns {string} Formatted temperature string
 */
export function formatTemperature(tempCelsius, unit, includeUnit = true) {
    const temp = unit === 'fahrenheit'
        ? celsiusToFahrenheit(tempCelsius)
        : tempCelsius;

    const rounded = Math.round(temp);

    if (!includeUnit) {
        return rounded.toString();
    }

    return unit === 'fahrenheit' ? `${rounded}°F` : `${rounded}°C`;
}

/**
 * Get both temperature formats for display
 * @param {number} tempCelsius - Temperature in Celsius
 * @returns {string} Dual format string like "24°C / 75°F"
 */
export function getDualTemperature(tempCelsius) {
    const celsius = Math.round(tempCelsius);
    const fahrenheit = Math.round(celsiusToFahrenheit(tempCelsius));
    return `${celsius}°C / ${fahrenheit}°F`;
}
