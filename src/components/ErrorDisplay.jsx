import { AlertCircle, RefreshCw } from 'lucide-react';

export default function ErrorDisplay({ error, onReset }) {
    return (
        <div className="w-full max-w-md mx-auto px-4 py-12">
            <div className="flex flex-col items-center gap-6 p-8 rounded-2xl 
        bg-slate-800/60 dark:bg-slate-800/60 light:bg-white
        border border-red-500/30
        text-center">

                <AlertCircle className="w-16 h-16 text-red-400" />

                <div>
                    <h2 className="text-xl font-semibold text-slate-100 dark:text-slate-100 light:text-slate-800 mb-2">
                        Something went wrong
                    </h2>
                    <p className="text-slate-400 dark:text-slate-400 light:text-slate-600">
                        {error || 'Unable to fetch weather data. Please try again.'}
                    </p>
                </div>

                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-6 py-3 rounded-full
            bg-gradient-to-r from-sky-500 to-sky-600
            hover:from-sky-400 hover:to-sky-500
            text-white font-medium
            transition-all transform hover:scale-105
            shadow-lg shadow-sky-500/30"
                >
                    <RefreshCw className="w-5 h-5" />
                    Reset & Retry
                </button>
            </div>
        </div>
    );
}
