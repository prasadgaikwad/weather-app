import { MapPin, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

export default function Header({ location, onLocationChange }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="w-full px-4 py-4 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Location Display */}
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-sky-500 flex-shrink-0" />
                    <div>
                        <h1 className="text-lg font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800">
                            {location.name}
                        </h1>
                        <p className="text-sm text-slate-400 dark:text-slate-400 light:text-slate-500">
                            {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
                        </p>
                    </div>
                </div>

                {/* Search and Theme Toggle */}
                <div className="flex items-center gap-4 flex-1 md:flex-none md:w-auto justify-end">
                    <SearchBar onLocationChange={onLocationChange} />

                    <button
                        onClick={toggleTheme}
                        className="p-2.5 rounded-full bg-slate-700/50 dark:bg-slate-700/50 light:bg-slate-200 hover:bg-slate-600/50 dark:hover:bg-slate-600/50 light:hover:bg-slate-300 transition-colors"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? (
                            <Sun className="w-5 h-5 text-amber-400" />
                        ) : (
                            <Moon className="w-5 h-5 text-slate-600" />
                        )}
                    </button>
                </div>
            </div>
        </header>
    );
}
