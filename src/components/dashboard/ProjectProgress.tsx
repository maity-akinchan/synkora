'use client';

import { Project } from '@/lib/commons/store/useProjectStore';

interface ProjectProgressProps {
    projects: Project[];
}

export default function ProjectProgress({ projects }: ProjectProgressProps) {
    let totalTasks = 0;
    let completedTasks = 0;
    let inProgressTasks = 0;
    let pendingTasks = 0;

    projects.forEach((p) => {
        totalTasks += p.tasks.length;
        p.tasks.forEach((t) => {
            if (t.status === 'Completed') completedTasks++;
            else if (t.status === 'In Progress') inProgressTasks++;
            else pendingTasks++;
        });
    });

    const percentCompleted = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <div
            className="p-6 rounded-md shadow flex flex-col items-center"
            style={{
                backgroundColor: 'var(--color-background)',
                color: 'var(--color-foreground)',
            }}
        >
            <h3
                className="mb-4 font-semibold"
                style={{ color: 'var(--color-muted-foreground)' }}
            >
                Project Progress
            </h3>

            {/* Progress Circle */}
            <svg viewBox="0 0 36 36" className="w-48 h-48">
                {/* Background Track */}
                <path
                    strokeWidth="3"
                    stroke="var(--color-border)"
                    fill="none"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {/* Progress Path */}
                <path
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${percentCompleted}, 100`}
                    stroke="var(--color-primary)"
                    fill="none"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 0 1 0 31.831
                       a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>

            {/* Percent */}
            <p
                className="text-center text-4xl font-bold"
                style={{ color: 'var(--color-foreground)' }}
            >
                {percentCompleted}%
            </p>
            <p
                className="text-center text-sm"
                style={{ color: 'var(--color-muted-foreground)' }}
            >
                Project Ended
            </p>

            {/* Legend */}
            <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-full block"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                    />
                    <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-full block"
                        style={{ backgroundColor: 'var(--bg-primary)' }}
                    />
                    <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                    <span
                        className="w-4 h-4 rounded-full block"
                        style={{
                            border: `2px solid var(--color-border)`,
                            backgroundColor: 'transparent',
                        }}
                    />
                    <span>Pending</span>
                </div>
            </div>
        </div>
    );
}
