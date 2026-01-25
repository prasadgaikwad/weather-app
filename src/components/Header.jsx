import { MapPin, Sun, Moon, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

export default function Header({ location, onLocationChange, onRefresh }) {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="w-full px-4 py-4 md:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 relative">
                {/* Spacer for Desktop centering balance */}
                <div className="hidden md:block flex-1" />

                {/* Location Display (Centered) */}
                <div className="flex flex-col items-center gap-2 flex-initial">
                    <div className="flex items-center gap-2 justify-center">
                        <MapPin className="w-6 h-6 text-sky-500" />
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-100 dark:text-slate-100 light:text-slate-800 tracking-tight text-center">
                            {location.name}
                        </h1>
                    </div>
                </div>

                {/* Search, Refresh and Theme Toggle (Right aligned) */}
                <div className="flex items-center gap-4 w-full md:w-auto md:flex-1 md:justify-end">
                    <SearchBar onLocationChange={onLocationChange} />

                    <button
                        onClick={onRefresh}
                        className="p-2.5 rounded-full bg-slate-700/50 dark:bg-slate-700/50 light:bg-slate-200 hover:bg-slate-600/50 dark:hover:bg-slate-600/50 light:hover:bg-slate-300 transition-colors group"
                        aria-label="Refresh weather data"
                    >
                        <RefreshCw className="w-5 h-5 text-slate-400 dark:text-slate-400 light:text-slate-500 group-hover:rotate-180 transition-transform duration-500" />
                    </button>

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
