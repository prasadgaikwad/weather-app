import { useMemo } from 'react';
import DayBar from './DayBar';

export default function TemperatureChart({ weatherData, unit }) {
    // Calculate global min/max for relative positioning
    const { globalMin, globalMax, todayIndex } = useMemo(() => {
        if (!weatherData || weatherData.length === 0) {
            return { globalMin: 0, globalMax: 100, todayIndex: -1 };
        }

        const allMinTemps = weatherData.map(d => d.minTemp);
        const allMaxTemps = weatherData.map(d => d.maxTemp);

        const min = Math.min(...allMinTemps);
        const max = Math.max(...allMaxTemps);

        // Add some padding
        const padding = (max - min) * 0.1;

        // Find today's index - use local date, not UTC
        const now = new Date();
        const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
        const todayIdx = weatherData.findIndex(d => d.date === today);

        return {
            globalMin: min - padding,
            globalMax: max + padding,
            todayIndex: todayIdx,
        };
    }, [weatherData]);

    if (!weatherData || weatherData.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="relative overflow-hidden rounded-2xl 
        bg-slate-800/40 dark:bg-slate-800/40 light:bg-white/60
        border border-slate-700/30 dark:border-slate-700/30 light:border-slate-200
        backdrop-blur-sm p-6">

                {/* Background grid lines */}
                <div className="absolute inset-6 pointer-events-none">
                    {[0, 25, 50, 75, 100].map((percent) => (
                        <div
                            key={percent}
                            className="absolute left-0 right-0 border-t border-slate-600/20 dark:border-slate-600/20 light:border-slate-300/30"
                            style={{ bottom: `${percent}%` }}
                        />
                    ))}
                </div>

                {/* Scrollable chart area */}
                <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-transparent pb-2">
                    <div className="flex items-end justify-center gap-4 min-w-max px-4">
                        {weatherData.map((day, index) => (
                            <DayBar
                                key={day.date}
                                date={day.date}
                                minTemp={day.minTemp}
                                maxTemp={day.maxTemp}
                                weatherCode={day.weatherCode}
                                globalMin={globalMin}
                                globalMax={globalMax}
                                unit={unit}
                                isToday={index === todayIndex}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
