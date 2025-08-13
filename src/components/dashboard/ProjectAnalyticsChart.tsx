'use client';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Project, TaskStatus } from '@/lib/stores/useProjectStore';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface ProjectAnalyticsChartProps {
    projects: Project[];
}

export default function ProjectAnalyticsChart({ projects }: ProjectAnalyticsChartProps) {
    // Task status distribution for all projects per day in week sample data
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    // Just simple example: randomly generated completion percentages
    const data = {
        labels: days,
        datasets: [
            {
                label: 'Project Analytics',
                data: [30, 74, 40, 80, 60, 53, 20],
                backgroundColor: '#16a34a',
                borderRadius: 9999,
                barPercentage: 0.6,
            },
        ],
    };

    const options = {
        plugins: { legend: { display: false } },
        scales: {
            y: { display: false },
            x: {
                grid: { display: false },
                ticks: { color: '#6b7280' },
            },
        },
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow">
            <h3 className="mb-3 font-semibold text-gray-700 dark:text-gray-300">Project Analytics</h3>
            <Bar data={data} options={options} />
        </div>
    );
}