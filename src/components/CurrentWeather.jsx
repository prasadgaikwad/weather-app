import * as LucideIcons from 'lucide-react';
import { getWeatherDescription, getWeatherIconName } from '../utils/weatherCodes';
import { getDualTemperature } from '../utils/temperature';

export default function CurrentWeather({ currentWeather }) {
    if (!currentWeather) return null;

    const iconName = getWeatherIconName(currentWeather.code);
    const rawDescription = getWeatherDescription(currentWeather.code);
    // Convert to Title Case
    const description = rawDescription.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
    const IconComponent = LucideIcons[iconName] || LucideIcons.Cloud;

    return (
        <div className="w-full max-w-md mx-auto px-4 mb-6">
            <div className="relative overflow-hidden rounded-2xl 
        bg-gradient-to-br from-slate-800/80 to-slate-800/40 
        dark:from-slate-800/80 dark:to-slate-800/40 
        light:from-white light:to-slate-50
        border border-sky-500/30 dark:border-sky-500/30 light:border-sky-400/50
        backdrop-blur-sm shadow-lg shadow-sky-500/10">

                {/* Decorative gradient orb */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-sky-500/20 to-amber-500/20 rounded-full blur-2xl" />

                <div className="relative p-6 flex items-center justify-between">
                    {/* Icon and Description */}
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-gradient-to-br from-sky-500/20 to-amber-500/20">
                            <IconComponent className="w-10 h-10 text-sky-400" />
                        </div>
                        <div>
                            <p className="text-lg font-medium text-slate-100 dark:text-slate-100 light:text-slate-800">
                                {description}
                            </p>
                            <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500">
                                Current Conditions
                            </p>
                        </div>
                    </div>

                    {/* Temperature */}
                    <div className="text-right flex-shrink-0">
                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-sky-400 to-amber-400 bg-clip-text text-transparent whitespace-nowrap">
                            {getDualTemperature(currentWeather.temp)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
