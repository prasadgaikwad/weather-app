import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { searchCity } from '../utils/api';

export default function SearchBar({ onLocationChange }) {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!query.trim()) return;

        setLoading(true);
        setError('');

        try {
            const result = await searchCity(query.trim());

            if (!result) {
                setError('City not found');
                return;
            }

            onLocationChange({
                lat: result.lat,
                lon: result.lon,
                name: `${result.name}${result.admin1 ? `, ${result.admin1}` : ''}, ${result.country}`,
            });

            setQuery('');
            setError('');
        } catch (err) {
            setError('Search failed. Please try again.');
            console.error('Search error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSearch} className="relative flex-1 md:flex-none md:w-64">
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        if (error) setError('');
                    }}
                    placeholder="Search city..."
                    className="w-full px-4 py-2.5 pr-10 rounded-full 
            bg-slate-700/50 dark:bg-slate-700/50 light:bg-white
            border border-slate-600/50 dark:border-slate-600/50 light:border-slate-300
            text-slate-100 dark:text-slate-100 light:text-slate-800
            placeholder-slate-400 dark:placeholder-slate-400 light:placeholder-slate-500
            focus:outline-none focus:ring-2 focus:ring-sky-500/50
            transition-all"
                    disabled={loading}
                />
                <button
                    type="submit"
                    disabled={loading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 
            text-slate-400 hover:text-sky-400 
            disabled:text-slate-500 transition-colors"
                >
                    {loading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <Search className="w-5 h-5" />
                    )}
                </button>
            </div>

            {error && (
                <p className="absolute top-full left-0 right-0 mt-1 text-sm text-red-400 text-center">
                    {error}
                </p>
            )}
        </form>
    );
}
