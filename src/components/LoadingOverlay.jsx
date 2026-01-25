import { Loader2 } from 'lucide-react';

export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center 
      bg-slate-900/60 dark:bg-slate-900/60 light:bg-white/60 
      backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-sky-500 animate-spin" />
                <p className="text-slate-300 dark:text-slate-300 light:text-slate-600 text-lg font-medium">
                    Loading weather data...
                </p>
            </div>
        </div>
    );
}
