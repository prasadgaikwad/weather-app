import { Thermometer } from 'lucide-react';

export default function ChartControls({ daysBuffer, onDaysChange, unit, onUnitChange }) {
    return (
        <div className="w-full max-w-lg mx-auto px-4 mb-8">
            <div className="flex items-center justify-center gap-6 p-4 rounded-full 
        bg-slate-800/60 dark:bg-slate-800/60 light:bg-white/80
        border border-slate-700/50 dark:border-slate-700/50 light:border-slate-200
        backdrop-blur-sm shadow-lg">

                {/* Range Slider */}
                <div className="flex items-center gap-3 flex-1">
                    <span className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500 whitespace-nowrap">
                        ±{daysBuffer} days
                    </span>
                    <input
                        type="range"
                        min="1"
                        max="14"
                        value={daysBuffer}
                        onChange={(e) => onDaysChange(parseInt(e.target.value, 10))}
                        className="flex-1 h-2 bg-slate-700 dark:bg-slate-700 light:bg-slate-200 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gradient-to-r
              [&::-webkit-slider-thumb]:from-sky-500
              [&::-webkit-slider-thumb]:to-amber-500
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-lg
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-gradient-to-r
              [&::-moz-range-thumb]:from-sky-500
              [&::-moz-range-thumb]:to-amber-500
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:border-0"
                    />
                </div>

                {/* Divider */}
                <div className="w-px h-8 bg-slate-600/50" />

                {/* Unit Toggle */}
                <button
                    onClick={() => onUnitChange(unit === 'celsius' ? 'fahrenheit' : 'celsius')}
                    className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-slate-700/50 dark:bg-slate-700/50 light:bg-slate-100
            hover:bg-slate-600/50 dark:hover:bg-slate-600/50 light:hover:bg-slate-200
            transition-colors group"
                >
                    <Thermometer className="w-4 h-4 text-sky-400" />
                    <span className="text-sm font-medium text-slate-200 dark:text-slate-200 light:text-slate-700">
                        {unit === 'celsius' ? '°C' : '°F'}
                    </span>
                </button>
            </div>
        </div>
    );
}
