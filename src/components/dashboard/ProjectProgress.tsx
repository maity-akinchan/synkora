'use client';

import { Project } from '@/lib/stores/useProjectStore';

interface ProjectProgressProps {
    projects: Project[];
}

export default function ProjectProgress({ projects }: ProjectProgressProps) {
    // Calculate overall progress percentage
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
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow flex flex-col items-center">
            <h3 className="mb-4 font-semibold text-gray-700 dark:text-gray-300">Project Progress</h3>
            <svg viewBox="0 0 36 36" className="w-48 h-48">
                <path
                    className="text-gray-300 dark:text-gray-700"
                    strokeWidth="3"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                    className="text-green-600"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${percentCompleted}, 100`}
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
                />
            </svg>
            <p className="text-center text-4xl font-bold text-gray-900 dark:text-white">{percentCompleted}%</p>
            <p className="text-center text-sm text-gray-600 dark:text-gray-400">Project Ended</p>
            <div className="flex gap-6 mt-4">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-600 block" />
                    <span>Completed</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-green-900 block" />
                    <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-gray-400 block" />
                    <span>Pending</span>
                </div>
            </div>
        </div>
    );
}