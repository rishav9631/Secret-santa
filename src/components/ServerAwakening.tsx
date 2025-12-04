import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Snowflake, Coffee } from "lucide-react";
import { API_URL } from "@/config";

interface ServerAwakeningProps {
    onAwake: () => void;
}

export function ServerAwakening({ onAwake }: ServerAwakeningProps) {
    const [progress, setProgress] = useState(0);
    const [message, setMessage] = useState("Waking up the elves...");

    useEffect(() => {
        let attempts = 0;
        const maxAttempts = 30; // 30 attempts * 2s = 60s max wait (usually takes 15-30s on Render free tier)

        const checkHealth = async () => {
            try {
                const res = await fetch(`${API_URL}/health`);
                if (res.ok) {
                    setProgress(100);
                    setTimeout(onAwake, 500); // Small delay to show 100%
                    return;
                }
            } catch (e) {
                // Ignore error and retry
            }

            attempts++;
            const percentage = Math.min((attempts / 15) * 100, 95); // Fake progress up to 95% based on expected 15s
            setProgress(percentage);

            if (attempts > 5) setMessage("Brewing hot cocoa...");
            if (attempts > 10) setMessage("Shoveling snow off the server...");
            if (attempts > 15) setMessage("Almost there! Free tier servers are sleepy...");
            if (attempts > 30) setMessage("Still waiting... The elves are taking their time.");
            if (attempts > 60) setMessage("Just a little longer... Santa is checking the list.");

            setTimeout(checkHealth, 1000);
        };

        checkHealth();
    }, [onAwake]);

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white p-4">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="relative">
                    <div className="absolute inset-0 bg-red-500 blur-3xl opacity-20 rounded-full animate-pulse"></div>
                    <Snowflake className="w-24 h-24 mx-auto text-blue-200 animate-spin-slow" />
                </div>

                <div className="space-y-4">
                    <h2 className="text-3xl font-bold font-christmas text-shadow-glow">
                        Starting the Sleigh...
                    </h2>
                    <p className="text-blue-200 text-lg animate-pulse">
                        {message}
                    </p>
                </div>

                <div className="space-y-2">
                    <Progress value={progress} className="h-3 bg-white/10" />
                    <p className="text-xs text-white/40">
                        Connecting to backend (may take ~15-30s on first load)
                    </p>
                </div>
            </div>
        </div>
    );
}
