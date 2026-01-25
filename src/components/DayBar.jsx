import * as LucideIcons from 'lucide-react';
import { formatTemperature } from '../utils/temperature';
import { getWeatherIconName } from '../utils/weatherCodes';

export default function DayBar({
    date,
    minTemp,
    maxTemp,
    weatherCode,
    globalMin,
    globalMax,
    unit,
    isToday
}) {
    // Calculate the temperature range for scaling
    const range = globalMax - globalMin;
    const safeRange = range === 0 ? 1 : range; // Prevent division by zero

    // Calculate bar positioning (as percentage of the chart height)
    // Reserve top 15% for icon and labels
    const chartAreaPercent = 85;
    const barBottom = ((minTemp - globalMin) / safeRange) * chartAreaPercent;
    const barHeight = ((maxTemp - minTemp) / safeRange) * chartAreaPercent;

    // Minimum height to ensure visibility
    const minHeightPercent = 8;
    const displayHeight = Math.max(barHeight, minHeightPercent);

    // Format the date
    const dateObj = new Date(date + 'T00:00:00');
    const dayName = dateObj.toLocaleDateString('en-US', { weekday: 'short' });
    const dayNum = dateObj.getDate();

    // Get weather icon
    const iconName = getWeatherIconName(weatherCode);
    const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

    return (
        <div className="flex flex-col items-center gap-1 flex-shrink-0" style={{ width: '65px' }}>
            {/* Weather icon at top */}
            <div className="h-6 flex items-center justify-center">
                <IconComponent
                    className={`w-5 h-5 ${isToday ? 'text-sky-400' : 'text-slate-400 dark:text-slate-400 light:text-slate-500'}`}
                />
            </div>

            {/* Temperature labels and bar container */}
            <div className="relative w-full h-52 flex flex-col items-center">
                {/* Max temp label */}
                <div
                    className="absolute text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-700 whitespace-nowrap z-10"
                    style={{
                        bottom: `calc(${barBottom + displayHeight}% + 4px)`,
                    }}
                >
                    {formatTemperature(maxTemp, unit)}
                </div>

                {/* The bar itself */}
                <div
                    className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-300 ease-out"
                    style={{
                        bottom: `${barBottom}%`,
                        height: `${displayHeight}%`,
                        width: '35%',
                        minWidth: '8px',
                        maxWidth: '48px',
                        background: 'linear-gradient(to top, #fbbf24, #0ea5e9)',
                        boxShadow: isToday
                            ? '0 0 20px rgba(14, 165, 233, 0.5), 0 0 40px rgba(251, 191, 36, 0.3)'
                            : '0 4px 12px rgba(0, 0, 0, 0.3)',
                    }}
                />

                {/* Min temp label */}
                <div
                    className="absolute text-xs font-semibold text-slate-300 dark:text-slate-300 light:text-slate-600 whitespace-nowrap z-10"
                    style={{
                        bottom: `calc(${barBottom}% - 18px)`,
                    }}
                >
                    {formatTemperature(minTemp, unit)}
                </div>
            </div>

            {/* Date label */}
            <div className={`text-center ${isToday ? 'text-sky-400' : 'text-slate-400 dark:text-slate-400 light:text-slate-500'}`}>
                <p className={`text-sm font-medium ${isToday ? 'text-sky-400' : ''}`}>
                    {isToday ? 'Today' : dayName}
                </p>
                <p className="text-xs opacity-75">{dayNum}</p>
            </div>
        </div>
    );
}
