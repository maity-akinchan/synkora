'use client';

import { useState, useEffect } from 'react';

export default function TimeTracker() {
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;
        if (running) {
            interval = setInterval(() => setTime((prev) => prev + 1), 1000);
        }
        return () => clearInterval(interval);
    }, [running]);

    const formatTime = (t: number) => {
        const hrs = Math.floor(t / 3600);
        const mins = Math.floor((t % 3600) / 60);
        const secs = t % 60;
        return `${hrs.toString().padStart(2, '0')}:${mins
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="bg-green-900 rounded-lg p-6 text-white shadow flex flex-col items-center gap-4">
            <h3 className="text-xl font-semibold">Time Tracker</h3>
            <p className="text-4xl font-mono">{formatTime(time)}</p>
            <div className="flex gap-4">
                <button
                    onClick={() => setRunning(!running)}
                    aria-label={running ? 'Pause timer' : 'Start timer'}
                    className="bg-green-700 hover:bg-green-600 px-4 py-2 rounded shadow"
                >
                    {running ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={() => {
                        setRunning(false);
                        setTime(0);
                    }}
                    aria-label="Stop timer"
                    className="bg-red-700 hover:bg-red-600 px-4 py-2 rounded shadow"
                >
                    Stop
                </button>
            </div>
        </div>
    );
}